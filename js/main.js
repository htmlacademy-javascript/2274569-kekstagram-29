const POST_COUNT = 25;

const MESSAGE = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Солнечный закат на океане',
  'Цветущая вишня на фоне голубого неба',
  'Дети, играющие в парке',
  'Роскошные лилии в саду',
  'Регулярные знаки на дороге',
  'Мороженое с ванильным соусом',
  'Закат в горах',
  'Старинная улица в Европе',
  'Две кошки на окне',
  'Тропические пальмы на пляже',
  'Разноцветные мячи на футбольном поле',
  'Цветущие маки на лугу',
  'Небольшой водопад в скалах',
  'Заброшенный старинный дом',
  'Каркасные здания на фоне леса',
  'Желтые листья на земле в парке',
  'Причудливая рыба в аквариуме',
  'Пляжный бар с видом на море',
  'Две лодки на реке',
  'Красивые цветы на балконе',
  'Солнечный день на голубой воде',
  'Птицы на кормушке в саду',
  'Золотистые листья на фоне голубого неба',
  'Морской волнорез оранжевого цвета',
  'Закат на горном озере'
];

const NAMES = ['Васян',
  'Дима',
  'Мучачос',
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

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

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoLike = createRandomIdFromRangeGenerator(15, 200);
const generatePhotoDescription = createRandomIdFromRangeGenerator(0, 24);
const generateCommentId = createRandomIdFromRangeGenerator(1, 9999);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: `${getRandomArrayElement(NAMES) }`
});

const createPost = () => ({
  id: generatePhotoId(),
  url: `photos /${ generatePhotoUrl() }.jpg`,
  description: generatePhotoDescription(DESCRIPTION),
  likes: generatePhotoLike(),
  coments: Array.from({length: getRandomInteger(0, 30)}, createComment)
});

const posts = Array.from({length: POST_COUNT}, createPost);

// eslint-disable-next-line no-console
console.log(posts);
