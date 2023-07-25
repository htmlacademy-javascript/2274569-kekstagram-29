import { data } from './api.js';

const ALERT_SHOW_TIME = 5000;
const RANDOM_PHOTOS_COUNT = 10;

const errorContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateArrayUniqueNumbers = (a, b) => {
  const numbers = [];
  while (numbers.length < RANDOM_PHOTOS_COUNT) {
    const randomNumber = getRandomInteger(a, b);
    let found = false;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === randomNumber){
        found = true;
        break;
      }
    }
    if (!found) {
      numbers[numbers.length] = randomNumber;
    }
  }
  return numbers;
};

const randomNumbers = generateArrayUniqueNumbers(1, 24);
const createRandomPosts = () => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const posts = data.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlertError = (message) => {
  errorContainer.style.height = '40px';
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showAlertSuccess = (message) => {
  successContainer.style.height = '40px';
  successContainer.style.zIndex = '100';
  successContainer.style.position = 'absolute';
  successContainer.style.left = '0';
  successContainer.style.top = '0';
  successContainer.style.right = '0';
  successContainer.style.padding = '10px 3px';
  successContainer.style.fontSize = '30px';
  successContainer.style.textAlign = 'center';
  successContainer.style.backgroundColor = 'green';

  successContainer.textContent = message;

  document.body.append(successContainer);

  setTimeout(() => {
    successContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, showAlertError, showAlertSuccess, createRandomPosts, debounce};
