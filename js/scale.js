const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const updateScale = (value) => {
  currentScale = value;
  scaleControlValueElement.value = `${value}%`;
  imagePreviewElement.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  if (currentScale > MIN_SCALE) {
    updateScale(currentScale - SCALE_STEP);
  }
};

const onBiggerButtonClick = () => {
  if (currentScale < MAX_SCALE) {
    updateScale(currentScale + SCALE_STEP);
  }
};

const resetScale = () => {
  updateScale(DEFAULT_SCALE);
};

scaleControlSmallerElement.addEventListener('click', onSmallerButtonClick);
scaleControlBiggerElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
