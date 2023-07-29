import {isEscapeKey} from './util.js';
import {pristine} from './form-validate.js';
import {changeOriginalEffect, effectChange} from './form-effects.js';

//Форма.
const imgUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const formEditor = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const effecstList = document.querySelector('.effects__list');

//Превью фото.
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

//Масштаб.
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview');
let scaleNumber;

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

// Получаем число из строки.
const getScaleNumber = (scaleString) => parseInt(scaleString.value, 10);

// Уменьшение изображения.
const onMinButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber > SCALE_MIN) {
    scaleValue.value = `${scaleNumber - SCALE_STEP}%`;
    scaleImage.style.transform = `scale(${(scaleNumber - SCALE_STEP) / 100})`;
  }
};

//Увеличение изображения.
const onMaxButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber < SCALE_MAX) {
    scaleValue.value = `${scaleNumber + SCALE_STEP}%`;
    scaleImage.style.transform = `scale(${(scaleNumber + SCALE_STEP) / 100})`;
  }
};

//Открытие формы.
const openForm = () => {
  //У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.
  formEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  //Закрытие формы по клику.
  uploadCancelButton.addEventListener('click', onCloseButtonClick);
  // Закрытие формы по нажатию на Esc.
  window.addEventListener('keydown', onDocumentKeydown);
  //Добавляем обработчики scale.value в %.
  scaleSmaller.addEventListener('click', onMinButtonClick);
  scaleBigger.addEventListener('click', onMaxButtonClick);
  //Эффекты.
  changeOriginalEffect();
  effecstList.addEventListener('change', effectChange);
};

//Вывод формы после выбора изображения.
imageUploadInput.addEventListener('change', () => {
  openForm();
});

//Закрытие формы.
const closeForm = () => {
  // Элементу .img-upload__overlay возвращается класс hidden. У элемента body удаляется класс modal-open.
  formEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  //Удаляем обработчики.
  uploadCancelButton.removeEventListener('click', onCloseButtonClick);
  window.removeEventListener('keydown', onDocumentKeydown);
  scaleSmaller.removeEventListener('click', onMinButtonClick);
  scaleBigger.removeEventListener('click', onMaxButtonClick);
  //Сбрасываем значение формы.
  imgUploadForm.reset();
  scaleImage.style.transform = '';
  pristine.reset();
};

// Функция закрытия формы по клику на крестик.
function onCloseButtonClick () {
  closeForm ();
}

// Функция закрытия формы по кнопке ESС.
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
});

export {onDocumentKeydown, closeForm};
