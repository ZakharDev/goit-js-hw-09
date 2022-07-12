import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  amount: document.querySelector('[name="amount"]'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
};



refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  // let amount = Number(e.currentTarget.amount.value);
  // let delay = Number(e.currentTarget.delay.value);
  // let step = Number(e.currentTarget.step.value);

  let amount = parseInt(refs.amount.value);
  let delay = parseInt(refs.delay.value);
  let step = parseInt(refs.step.value);

  if (delay < 0 || amount < 0 || step < 0) {
    Notify.failure('Error! All values must be bigger than 0 ');
    return;
  }

  for (let position = 1; position <= amount ; position++) {
   createPromise(position, delay)
  .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
  }

};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay});
      } else {
        reject({ position, delay});
      }
    }, delay)
  });
};