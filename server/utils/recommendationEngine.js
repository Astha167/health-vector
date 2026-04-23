/**
 * Recommendation Engine
 * Input: { physical, mental, emotional, prakritiType }
 * Output: Array of recommendation objects, ranked by priority
 */

const recommendations = {
  physical: {
    critical: [
      {
        title: 'Start a 15-Minute Morning Walk',
        description: 'Begin each day with a brisk 15-minute walk outdoors. Morning light exposure regulates circadian rhythm and boosts your mood.',
        timeRequired: '15 min/day',
        difficulty: 'Easy',
        type: 'Exercise',
        basis: 'Evidence-based',
        tags: ['morning', 'outdoor', 'daily'],
      },
      {
        title: 'Add One Protein Serving Per Meal',
        description: 'Include eggs, legumes, paneer, or lean meat in every meal. Protein supports energy, muscle repair, and satiety.',
        timeRequired: 'Per meal',
        difficulty: 'Easy',
        type: 'Diet',
        basis: 'Evidence-based',
        tags: ['nutrition', 'protein', 'energy'],
      },
      {
        title: 'Fix Your Sleep Schedule',
        description: 'Go to bed and wake up at the same time every day — even weekends. Consistency is the single biggest predictor of sleep quality.',
        timeRequired: 'Lifestyle change',
        difficulty: 'Medium',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['sleep', 'routine', 'circadian'],
      },
    ],
    moderate: [
      {
        title: 'Introduce Yoga 3x Per Week',
        description: 'Practice yoga for 30 minutes, three times a week. Yoga improves flexibility, reduces cortisol, and enhances body awareness.',
        timeRequired: '30 min × 3/week',
        difficulty: 'Medium',
        type: 'Exercise',
        basis: 'Evidence-based',
        tags: ['yoga', 'flexibility', 'stress'],
      },
      {
        title: 'Increase Water Intake to 2.5L/Day',
        description: 'Chronic mild dehydration reduces cognitive performance and energy. Aim for 8–10 glasses of water daily.',
        timeRequired: 'Throughout day',
        difficulty: 'Easy',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['hydration', 'energy', 'cognitive'],
      },
    ],
    optimal: [
      {
        title: 'Add Strength Training',
        description: 'You\'re doing well! Add 2 strength training sessions per week to build lean muscle and improve metabolic health.',
        timeRequired: '45 min × 2/week',
        difficulty: 'Medium',
        type: 'Exercise',
        basis: 'Evidence-based',
        tags: ['strength', 'muscle', 'metabolism'],
      },
    ],
  },
  mental: {
    critical: [
      {
        title: '10-Minute Box Breathing Daily',
        description: 'Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat for 10 minutes. Clinical studies show this activates the parasympathetic nervous system within minutes.',
        timeRequired: '10 min/day',
        difficulty: 'Easy',
        type: 'Mindfulness',
        basis: 'Evidence-based',
        tags: ['breathing', 'anxiety', 'calm'],
      },
      {
        title: 'Digital Detox Before Sleep',
        description: 'No screens 1 hour before bedtime. Blue light suppresses melatonin and keeps the mind alert when it needs to wind down.',
        timeRequired: '1 hr before sleep',
        difficulty: 'Medium',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['sleep', 'digital', 'screens'],
      },
      {
        title: 'Morning Gratitude Journaling',
        description: 'Write down 3 things you\'re grateful for each morning. Research shows this rewires the brain toward positive recall patterns over 3–4 weeks.',
        timeRequired: '5 min/morning',
        difficulty: 'Easy',
        type: 'Mindfulness',
        basis: 'Evidence-based',
        tags: ['gratitude', 'positivity', 'journaling'],
      },
    ],
    moderate: [
      {
        title: 'Take 5-Minute Breaks Every 90 Minutes',
        description: 'The ultradian rhythm cycles every 90 minutes — your brain naturally needs a break. Step away from screens, stretch, or breathe.',
        timeRequired: '5 min × 5–6/day',
        difficulty: 'Easy',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['focus', 'productivity', 'breaks'],
      },
      {
        title: 'Stress Journaling 3x Per Week',
        description: 'Write about stressors for 15 minutes, three times a week. Externalizing thoughts reduces rumination and improves problem-solving.',
        timeRequired: '15 min × 3/week',
        difficulty: 'Easy',
        type: 'Mindfulness',
        basis: 'Evidence-based',
        tags: ['stress', 'journaling', 'clarity'],
      },
    ],
    optimal: [
      {
        title: 'Learn a New Skill Each Month',
        description: 'Mental stimulation through novelty keeps the brain plastic and resilient. Pick up a new language, instrument, or creative skill.',
        timeRequired: '30 min/day',
        difficulty: 'Medium',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['learning', 'growth', 'cognition'],
      },
    ],
  },
  emotional: {
    critical: [
      {
        title: 'Reconnect with One Person This Week',
        description: 'Call, visit, or write to one friend or family member. Social connection is the most robust predictor of long-term emotional wellbeing.',
        timeRequired: '30 min/week',
        difficulty: 'Easy',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['social', 'connection', 'relationships'],
      },
      {
        title: 'Daily Emotion Labeling',
        description: 'Take 2 minutes each day to identify and name what you\'re feeling. Labeling emotions (affect labeling) reduces their intensity by up to 50%.',
        timeRequired: '2 min/day',
        difficulty: 'Easy',
        type: 'Mindfulness',
        basis: 'Evidence-based',
        tags: ['emotions', 'awareness', 'regulation'],
      },
      {
        title: 'One Creative Activity Per Week',
        description: 'Paint, write, cook something new, or play music. Creative expression is a proven emotional release mechanism.',
        timeRequired: '1 hr/week',
        difficulty: 'Easy',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['creativity', 'expression', 'emotional health'],
      },
    ],
    moderate: [
      {
        title: '10-Minute Mindfulness Meditation',
        description: 'Use apps like Insight Timer or simply focus on your breath for 10 minutes. Consistent practice rewires emotional regulation circuitry.',
        timeRequired: '10 min/day',
        difficulty: 'Easy',
        type: 'Mindfulness',
        basis: 'Evidence-based',
        tags: ['meditation', 'mindfulness', 'calm'],
      },
      {
        title: 'Join a Community Group',
        description: 'Volunteer, join a fitness class, or attend a community event. Belonging to a group buffers against emotional burnout.',
        timeRequired: '2–3 hrs/week',
        difficulty: 'Medium',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['community', 'belonging', 'social'],
      },
    ],
    optimal: [
      {
        title: 'Practice Random Acts of Kindness',
        description: 'Give a genuine compliment, help a stranger, or do something kind weekly. Research shows altruism boosts subjective wellbeing reliably.',
        timeRequired: '10 min/week',
        difficulty: 'Easy',
        type: 'Lifestyle',
        basis: 'Evidence-based',
        tags: ['kindness', 'gratitude', 'wellbeing'],
      },
    ],
  },
};

const prakritiOverlays = {
  Vata: [
    {
      title: 'Grounding Routine: Same Wake Time Daily',
      description: 'Vata types thrive on routine. Fix your wake-up time (ideally 6–7 AM) and anchor your day with stable meal times.',
      timeRequired: 'Lifestyle habit',
      difficulty: 'Medium',
      type: 'Lifestyle',
      basis: 'Ayurvedic',
      tags: ['vata', 'grounding', 'routine'],
    },
    {
      title: 'Warm, Nourishing Foods',
      description: 'Favour warm, cooked, slightly oily foods: soups, stews, ghee, sesame. Avoid raw salads, dry snacks, and cold beverages.',
      timeRequired: 'Per meal',
      difficulty: 'Easy',
      type: 'Diet',
      basis: 'Ayurvedic',
      tags: ['vata', 'diet', 'warm foods'],
    },
  ],
  Pitta: [
    {
      title: 'Cooling Pranayama (Sheetali)',
      description: 'Roll your tongue and inhale through it for 10 breaths. This Ayurvedic breathing technique cools Pitta heat and reduces irritability.',
      timeRequired: '5 min/day',
      difficulty: 'Easy',
      type: 'Mindfulness',
      basis: 'Ayurvedic',
      tags: ['pitta', 'cooling', 'breathing'],
    },
    {
      title: 'Cooling Foods: Coconut, Cucumber, Mint',
      description: 'Favour sweet, bitter, and astringent tastes. Include coconut water, cucumber, leafy greens, and avoid spicy, salty, or fried foods.',
      timeRequired: 'Per meal',
      difficulty: 'Easy',
      type: 'Diet',
      basis: 'Ayurvedic',
      tags: ['pitta', 'diet', 'cooling'],
    },
  ],
  Kapha: [
    {
      title: 'Energising Morning Movement',
      description: 'Kapha needs stimulation to counter natural heaviness. Do 10 minutes of brisk movement (jumping jacks, sun salutations) first thing every morning.',
      timeRequired: '10 min/morning',
      difficulty: 'Easy',
      type: 'Exercise',
      basis: 'Ayurvedic',
      tags: ['kapha', 'energy', 'morning'],
    },
    {
      title: 'Lighter Diet: Less Dairy and Heavy Grains',
      description: 'Kapha types benefit from lighter, spicier foods. Reduce dairy, wheat, and sweets. Favour legumes, vegetables, and warming spices like ginger.',
      timeRequired: 'Per meal',
      difficulty: 'Medium',
      type: 'Diet',
      basis: 'Ayurvedic',
      tags: ['kapha', 'diet', 'light foods'],
    },
  ],
};

const getZone = (score) => {
  if (score <= 40) return 'critical';
  if (score <= 70) return 'moderate';
  return 'optimal';
};

const generateRecommendations = ({ physical, mental, emotional, prakritiType }) => {
  const scores = { physical, mental, emotional };
  const result = [];

  // Find weakest dimension
  const weakest = Object.entries(scores).reduce((a, b) => (a[1] < b[1] ? a : b))[0];

  // Add recommendations for each dimension, starting with weakest
  const dimOrder = [weakest, ...['physical', 'mental', 'emotional'].filter((d) => d !== weakest)];

  dimOrder.forEach((dim) => {
    const zone = getZone(scores[dim]);
    const recs = recommendations[dim][zone] || [];
    recs.forEach((rec) => {
      result.push({ ...rec, dimension: dim, isFocusArea: dim === weakest });
    });
  });

  // Add Prakriti overlays
  if (prakritiType && prakritiOverlays[prakritiType]) {
    prakritiOverlays[prakritiType].forEach((rec) => {
      result.push({ ...rec, dimension: 'holistic', isFocusArea: false });
    });
  }

  return result;
};

module.exports = { generateRecommendations };
