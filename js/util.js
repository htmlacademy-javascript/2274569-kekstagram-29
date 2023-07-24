const ALERT_SHOW_TIME = 5000;

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


export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, showAlertError, showAlertSuccess};
