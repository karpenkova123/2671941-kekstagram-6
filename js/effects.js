const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  }
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectLevelElement = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';

const isNoneEffect = () => currentEffect === 'none';

const updateSlider = () => {
  effectLevelSliderElement.noUiSlider.updateOptions({
    range: {
      min: EFFECTS[currentEffect].min,
      max: EFFECTS[currentEffect].max
    },
    step: EFFECTS[currentEffect].step,
    start: EFFECTS[currentEffect].max
  });

  if (isNoneEffect()) {
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSliderElement.noUiSlider.get();
  effectLevelValueElement.value = sliderValue;

  if (isNoneEffect()) {
    imagePreviewElement.style.filter = 'none';
  } else {
    const { filter, unit } = EFFECTS[currentEffect];
    imagePreviewElement.style.filter = `${filter}(${sliderValue}${unit})`;
  }
};

const onEffectChange = (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    updateSlider();
  }
};

const resetEffects = () => {
  currentEffect = 'none';
  updateSlider();
};

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max
  },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

effectLevelSliderElement.noUiSlider.on('update', onSliderUpdate);
effectsListElement.addEventListener('change', onEffectChange);

effectLevelElement.classList.add('hidden');

export { resetEffects };
