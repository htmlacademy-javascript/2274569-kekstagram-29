const RANDOM_PHOTOS_COUNT = 10;
const ALERT_SHOW_TIME = 5000;

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

// Генерируем 10 неповторяющихся чисел от 0 до 24, т.к. в данном случае массив с сервера содержит только 25 постов.
const randomNumbers = generateArrayUniqueNumbers(0, 24);
const createRandomPosts = (array) => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const posts = array.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function showAlert (message) {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.top = '0';
  alert.style.left = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.background = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
}

function debounce (callback, timeoutDelay = 500) {
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

export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, showAlert, createRandomPosts, debounce};
