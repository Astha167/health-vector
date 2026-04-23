/**
 * Assessment Questions Data
 * 25 wellness questions (Q1–Q25) + 10 Prakriti questions (Q26–Q35)
 */

const WELLNESS_QUESTIONS = [
  // Physical (Q1–Q8) – max 40
  { id: 1, section: 'Physical', text: 'How would you rate your sleep quality over the past week?' },
  { id: 2, section: 'Physical', text: 'How often do you feel physically energetic during the day?' },
  { id: 3, section: 'Physical', text: 'How frequently do you engage in physical exercise or movement?' },
  { id: 4, section: 'Physical', text: 'How regular and balanced is your daily diet?' },
  { id: 5, section: 'Physical', text: 'Do you stay adequately hydrated throughout the day?' },
  { id: 6, section: 'Physical', text: 'Do you experience chronic physical pain, fatigue, or discomfort?', reversed: true },
  { id: 7, section: 'Physical', text: 'How satisfied are you with your current physical fitness level?' },
  { id: 8, section: 'Physical', text: 'Do you feel your body weight and physical health are in a comfortable state?' },

  // Mental (Q9–Q17) – max 45
  { id: 9, section: 'Mental', text: 'How often do you experience stress in your daily life?', reversed: true },
  { id: 10, section: 'Mental', text: 'How clear and focused is your thinking on a typical day?' },
  { id: 11, section: 'Mental', text: 'How would you describe your work-life balance?' },
  { id: 12, section: 'Mental', text: 'Do you experience anxiety or excessive worry?', reversed: true },
  { id: 13, section: 'Mental', text: 'How often do you feel mentally exhausted or experience decision fatigue?', reversed: true },
  { id: 14, section: 'Mental', text: 'Do you get adequate leisure or downtime to recharge mentally?' },
  { id: 15, section: 'Mental', text: 'Do you feel in control of your screen time and digital habits?' },
  { id: 16, section: 'Mental', text: 'How well do you sleep without your mind racing or overthinking?' },
  { id: 17, section: 'Mental', text: 'Do you feel mentally stimulated and engaged in your work or studies?' },

  // Emotional (Q18–Q25) – max 40
  { id: 18, section: 'Emotional', text: 'How stable is your mood on a day-to-day basis?' },
  { id: 19, section: 'Emotional', text: 'How satisfied are you with your key personal relationships?' },
  { id: 20, section: 'Emotional', text: 'Do you feel a clear sense of purpose or direction in life?' },
  { id: 21, section: 'Emotional', text: 'How well do you manage difficult emotions (anger, grief, frustration)?' },
  { id: 22, section: 'Emotional', text: 'Do you experience feelings of loneliness or social isolation?', reversed: true },
  { id: 23, section: 'Emotional', text: 'Do you regularly practice gratitude or positive reflection?' },
  { id: 24, section: 'Emotional', text: 'How would you rate your self-confidence and self-esteem?' },
  { id: 25, section: 'Emotional', text: 'Do you actively engage in social activities and community connections?' },
];

const PRAKRITI_QUESTIONS = [
  {
    id: 26,
    section: 'Prakriti',
    text: 'How would you describe your body frame?',
    options: [
      { label: 'Light and thin, difficult to gain weight', value: 1, type: 'Vata' },
      { label: 'Medium build, moderately muscular', value: 1, type: 'Pitta' },
      { label: 'Sturdy and solid, tends to gain weight easily', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 27,
    section: 'Prakriti',
    text: 'How is your digestion generally?',
    options: [
      { label: 'Irregular — sometimes constipated, sometimes fine', value: 1, type: 'Vata' },
      { label: 'Sharp and strong — I get very hungry and irritable if I miss a meal', value: 1, type: 'Pitta' },
      { label: 'Slow — I can skip meals easily and digest slowly', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 28,
    section: 'Prakriti',
    text: 'How do you respond to stress?',
    options: [
      { label: 'I become anxious, worried, or scattered', value: 1, type: 'Vata' },
      { label: 'I become irritable, frustrated, or angry', value: 1, type: 'Pitta' },
      { label: 'I withdraw, become quiet, or feel heavy and unmotivated', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 29,
    section: 'Prakriti',
    text: 'How is your sleep pattern?',
    options: [
      { label: 'Light and interrupted — I wake easily', value: 1, type: 'Vata' },
      { label: 'Moderate — I sleep 6–7 hours and wake refreshed', value: 1, type: 'Pitta' },
      { label: 'Deep and heavy — I love to sleep and can sleep 8–10 hours', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 30,
    section: 'Prakriti',
    text: 'What is your energy pattern throughout the day?',
    options: [
      { label: 'Bursts of energy followed by crashes', value: 1, type: 'Vata' },
      { label: 'Sustained and focused energy throughout the day', value: 1, type: 'Pitta' },
      { label: 'Slow to start but steady once I get going', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 31,
    section: 'Prakriti',
    text: 'What weather do you prefer?',
    options: [
      { label: 'Warm — I dislike cold and wind', value: 1, type: 'Vata' },
      { label: 'Cool — I overheat easily and prefer cooler weather', value: 1, type: 'Pitta' },
      { label: 'Dry and warm — I dislike cold and damp', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 32,
    section: 'Prakriti',
    text: 'How is your appetite?',
    options: [
      { label: 'Variable — sometimes hungry, sometimes I forget to eat', value: 1, type: 'Vata' },
      { label: 'Strong — I need to eat regularly and get "hangry"', value: 1, type: 'Pitta' },
      { label: 'Moderate — I can comfortably skip meals without much issue', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 33,
    section: 'Prakriti',
    text: 'How do you typically make decisions?',
    options: [
      { label: 'Quick to decide but often change my mind', value: 1, type: 'Vata' },
      { label: 'Decisive and confident — I analyze and act', value: 1, type: 'Pitta' },
      { label: 'Slow and deliberate — I think it through before committing', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 34,
    section: 'Prakriti',
    text: 'How would you describe your skin?',
    options: [
      { label: 'Dry, rough, or prone to cracking', value: 1, type: 'Vata' },
      { label: 'Oily or combination, prone to redness or acne', value: 1, type: 'Pitta' },
      { label: 'Smooth, thick, and well-hydrated', value: 1, type: 'Kapha' },
    ],
  },
  {
    id: 35,
    section: 'Prakriti',
    text: 'How do you learn best?',
    options: [
      { label: 'Quick to grasp new ideas but I forget quickly', value: 1, type: 'Vata' },
      { label: 'Sharp focus; I analyze and remember with precision', value: 1, type: 'Pitta' },
      { label: 'Slow to learn but I retain information very well', value: 1, type: 'Kapha' },
    ],
  },
];

const LIKERT_OPTIONS = [
  { value: 1, label: 'Never' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Always' },
];

module.exports = { WELLNESS_QUESTIONS, PRAKRITI_QUESTIONS, LIKERT_OPTIONS };
