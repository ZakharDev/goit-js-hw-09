import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const obj = { position: position, delay: delay };

      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const {
    delay: { valueAsNumber: delay = 0 },
    step: { valueAsNumber: step = 0 },
    amount: { valueAsNumber: amount = 0 },
  } = event.currentTarget;

  let delayProm = delay;

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delayProm)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayProm += step;
  }

  // event.currentTarget.reset();
}
