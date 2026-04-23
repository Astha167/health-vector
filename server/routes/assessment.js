const express = require('express');
const router = express.Router();
const { getQuestions, submitAssessment, getHistory, getAssessmentById, compareAssessments, getLatestAssessment } = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/questions', getQuestions);
router.get('/latest', protect, getLatestAssessment);
router.get('/history', protect, getHistory);
router.post('/submit', protect, submitAssessment);
router.get('/compare/:id1/:id2', protect, compareAssessments);
router.get('/:id', protect, getAssessmentById);

module.exports = router;
