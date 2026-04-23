const Assessment = require('../models/Assessment');
const User = require('../models/User');
const { WELLNESS_QUESTIONS, PRAKRITI_QUESTIONS } = require('../data/questions');
const { generateRecommendations } = require('../utils/recommendationEngine');

// Score calculation
const calculateScores = (responses) => {
  const physicalIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const mentalIds = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const emotionalIds = [18, 19, 20, 21, 22, 23, 24, 25];

  const reversedIds = [6, 9, 12, 13, 22]; // Questions where higher answer = worse

  const getScore = (qId, rawAnswer) => {
    return reversedIds.includes(qId) ? 6 - rawAnswer : rawAnswer;
  };

  const getGroupScore = (ids, max) => {
    let sum = 0;
    ids.forEach((id) => {
      const resp = responses.find((r) => r.questionId === id);
      if (resp) sum += getScore(id, resp.answer);
    });
    return Math.round((sum / max) * 100);
  };

  const physical = getGroupScore(physicalIds, 40);
  const mental = getGroupScore(mentalIds, 45);
  const emotional = getGroupScore(emotionalIds, 40);
  const overall = Math.round(physical * 0.35 + mental * 0.40 + emotional * 0.25);

  // Sub-dimension breakdown
  const getQ = (id) => {
    const r = responses.find((r) => r.questionId === id);
    return r ? getScore(id, r.answer) : 0;
  };

  const dimensionBreakdown = {
    sleep: Math.round(((getQ(1) + getQ(16)) / 10) * 100),
    energy: Math.round((getQ(2) / 5) * 100),
    activity: Math.round((getQ(3) / 5) * 100),
    diet: Math.round((getQ(4) / 5) * 100),
    hydration: Math.round((getQ(5) / 5) * 100),
    stress: Math.round((getQ(9) / 5) * 100),
    focus: Math.round((getQ(10) / 5) * 100),
    workLife: Math.round((getQ(11) / 5) * 100),
    anxiety: Math.round((getQ(12) / 5) * 100),
    digitalUse: Math.round((getQ(15) / 5) * 100),
    mood: Math.round((getQ(18) / 5) * 100),
    purpose: Math.round((getQ(20) / 5) * 100),
    relationships: Math.round((getQ(19) / 5) * 100),
    regulation: Math.round((getQ(21) / 5) * 100),
    gratitude: Math.round((getQ(23) / 5) * 100),
  };

  return { physical, mental, emotional, overall, dimensionBreakdown };
};

// Prakriti calculation
const calculatePrakriti = (prakritiResponses) => {
  const scores = { vata: 0, pitta: 0, kapha: 0 };

  PRAKRITI_QUESTIONS.forEach((q) => {
    const resp = prakritiResponses.find((r) => r.questionId === q.id);
    if (resp && q.options[resp.answer - 1]) {
      const type = q.options[resp.answer - 1].type?.toLowerCase();
      if (type && scores[type] !== undefined) scores[type]++;
    }
  });

  const dominant = Object.entries(scores).reduce((a, b) => (a[1] >= b[1] ? a : b))[0];
  const prakritiType = dominant.charAt(0).toUpperCase() + dominant.slice(1);

  return { scores, prakritiType };
};

// @route GET /api/assessment/questions
const getQuestions = (req, res) => {
  res.json({ wellness: WELLNESS_QUESTIONS, prakriti: PRAKRITI_QUESTIONS });
};

// @route POST /api/assessment/submit
const submitAssessment = async (req, res) => {
  try {
    const { wellnessResponses, prakritiResponses, skippedPrakriti } = req.body;

    if (!wellnessResponses || wellnessResponses.length < 25) {
      return res.status(400).json({ message: 'All 25 wellness questions must be answered' });
    }

    const allResponses = [...wellnessResponses, ...(prakritiResponses || [])];
    const { physical, mental, emotional, overall, dimensionBreakdown } = calculateScores(wellnessResponses);

    let prakritiScore = { vata: 0, pitta: 0, kapha: 0 };
    let prakritiType = null;

    if (!skippedPrakriti && prakritiResponses && prakritiResponses.length >= 10) {
      const prakritiResult = calculatePrakriti(prakritiResponses);
      prakritiScore = prakritiResult.scores;
      prakritiType = prakritiResult.prakritiType;

      // Update user's prakriti type
      await User.findByIdAndUpdate(req.user._id, { prakritiType });
    }

    const assessment = await Assessment.create({
      userId: req.user._id,
      responses: allResponses,
      scores: { physical, mental, emotional, overall },
      prakritiScore: { vata: prakritiScore.vata, pitta: prakritiScore.pitta, kapha: prakritiScore.kapha },
      prakritiType,
      dimensionBreakdown,
    });

    res.status(201).json({ assessment, recommendations: generateRecommendations({ physical, mental, emotional, prakritiType }) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting assessment' });
  }
};

// @route GET /api/assessment/history
const getHistory = async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user._id })
      .sort({ completedAt: -1 })
      .select('scores prakritiType completedAt dimensionBreakdown');
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessment history' });
  }
};

// @route GET /api/assessment/:id
const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
    if (assessment.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const recs = generateRecommendations({
      physical: assessment.scores.physical,
      mental: assessment.scores.mental,
      emotional: assessment.scores.emotional,
      prakritiType: assessment.prakritiType,
    });
    res.json({ assessment, recommendations: recs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessment' });
  }
};

// @route GET /api/assessment/compare/:id1/:id2
const compareAssessments = async (req, res) => {
  try {
    const [a1, a2] = await Promise.all([
      Assessment.findById(req.params.id1),
      Assessment.findById(req.params.id2),
    ]);
    if (!a1 || !a2) return res.status(404).json({ message: 'One or both assessments not found' });
    res.json({ assessment1: a1, assessment2: a2 });
  } catch (error) {
    res.status(500).json({ message: 'Error comparing assessments' });
  }
};

// @route GET /api/assessment/latest
const getLatestAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ userId: req.user._id }).sort({ completedAt: -1 });
    if (!assessment) return res.status(404).json({ message: 'No assessments found' });
    const recs = generateRecommendations({
      physical: assessment.scores.physical,
      mental: assessment.scores.mental,
      emotional: assessment.scores.emotional,
      prakritiType: assessment.prakritiType,
    });
    res.json({ assessment, recommendations: recs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest assessment' });
  }
};

module.exports = { getQuestions, submitAssessment, getHistory, getAssessmentById, compareAssessments, getLatestAssessment };
