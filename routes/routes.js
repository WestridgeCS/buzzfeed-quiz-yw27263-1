import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('quiz', {
    title: 'Buzzfeed Quiz',
    step: 1,
    state: {},
    outcome: null
  });
});

// One route handles all choices
router.post('/quiz', (req, res) => {
  res.render('quiz', {
    title: 'Quiz Question',
    state: {},
    outcome: null
  });
});

