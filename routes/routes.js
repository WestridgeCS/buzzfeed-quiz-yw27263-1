import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('quiz', {
    title: 'Person Quiz',
    step: 1,
    state: {},
    outcome: null
  });
});

// One route handles all choices
router.post('/quiz', (req, res) => {

  const body = req.body || {};

  const state = {
    q1: body.q1 || '',
    q2: body.q2 || '',
    q3: body.q3 || '',
    q4: body.q4 || ''
  };

  let step = 1;
  if(state.q1 && !state.q2) step = 2;
  if(state.q2 && !state.q3) step = 3;
  if(state.q3 && !state.q4) step = 4;
  if(state.q4 && state.q1 && state.q2 && state.q3) step = 5;

  let outcome = null;

  if (step === 5){
    outcome = getOutcome(state);
  }

  res.render('quiz', {
    title: 'Quiz Question',
    step: step,
    state: state,
    outcome
  });
});

//outcome function
function getOutcome(state){
  //to be written
  let aNum = Math.random()*(100-1)+1;

  let nap = 0;
  let soc = 0;
  let li = 0;

  Object.values(state).forEach(val => {
    if (val === "nap") nap++;
    else if (val === "soc") soc++;
    else li++;
  });

  if (aNum === 67){
    return {
      heading: 'ANNIKA',
      text: 'You have recieved the 1/100 chance of getting Annika!'
    }
  }
  else if (nap > soc && nap > li) {
    return{
      heading: 'Napolean',
      text: 'You walk into rooms like they owe you money. You would invade a country for organizational purposes. People follow you because you sound confident even when wrong.'
    }
  }
  else if (soc > nap && soc > li) {
    return{
      heading: 'Socrates',
      text: 'You are the reason meetings last longer than scheduled. You don’t want chaos—you want clarity, and you will dismantle everything to get it.'
    }
  }
  else if (li > soc && li > nap) {
    return{
      heading: 'Li Bai',
      text: 'You are emotionally sponsored by the moon. You disappear, reappear, and leave poetry where explanations should be. You are ungovernable.'
    }
  }
  else {
    return {
      heading: 'Napolean',
      text: 'You are indescisive and therefore you get napolean'
    }
  }
}