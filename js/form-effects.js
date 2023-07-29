const effectLevelValue = document.querySelector('.effect-level__value');
const effectElement = document.querySelector('.img-upload__effect-level');
const imagePreview = document.querySelector('.img-upload__preview');


//Создаем слайдер.
noUiSlider.create(effectElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


//Функция для смены параметров слайдера.
const changeSlider = (opts) => {
  const {min, max, step, start} = opts;
  effectElement.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: start,
  });
};

const changeOriginalEffect = () => {
  imagePreview.style.filter = '';
  effectElement.classList.add('hidden');
};

const EFFECTS_LIST = {
  'effect-chrome': {
    opts: {
    // Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1.
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    effectName: 'grayscale',
    unitMeasurement: '',
  },
  'effect-sepia': {
    opts: {
    //Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1.
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    effectName: 'sepia',
    unitMeasurement: '',
  },
  'effect-marvin': {
    opts: {
    //Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%.
      min: 0,
      max: 100,
      step: 1,
      start: 100,
    },
    effectName: 'invert',
    unitMeasurement: '%',
  },
  'effect-phobos': {
    opts: {
    //Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px.
      min: 0,
      max: 3,
      step: 0.1,
      start: 3,
    },
    effectName: 'blur',
    unitMeasurement: 'px',
  },
  'effect-heat': {
    opts: {
    //Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1.
      min: 1,
      max: 3,
      step: 0.1,
      start: 3,
    },
    effectName: 'brightness',
    unitMeasurement: '',
  },
};

const changeValueEffect = (effectName, unitMeasurement) => {
  effectElement.noUiSlider.off();
  effectElement.noUiSlider.on('update', () => {
    effectLevelValue.value = effectElement.noUiSlider.get();
    imagePreview.style.filter = `${effectName}(${effectLevelValue.value}${unitMeasurement})`;
  });
};

const effectChange = (evt) => {
  const effect = evt.target.id;
  if (effect === 'effect-none') {
    changeOriginalEffect();
    return;
  }
  effectElement.classList.remove('hidden');
  const opts = EFFECTS_LIST[effect].opts;
  const effectName = EFFECTS_LIST[effect].effectName;
  const unitMeasurement = EFFECTS_LIST[effect].unitMeasurement;
  changeSlider(opts);
  changeValueEffect(effectName, unitMeasurement);
};

export {changeOriginalEffect, effectChange};
