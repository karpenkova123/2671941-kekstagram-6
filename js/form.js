import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Публикую...'
};

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const closeButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const previewImageElement = formElement.querySelector('.img-upload__preview img');
const effectsPreviewElements = formElement.querySelectorAll('.effects__preview');
const bodyElement = document.body;

let currentImageUrl = null;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const splitHashtags = (value) => value.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagsFormat = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = splitHashtags(value);
  return hashtags.every((tag) => HASHTAG_PATTERN.test(tag));
};

const validateHashtagsCount = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = splitHashtags(value);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagsUniqueness = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtags = splitHashtags(value).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const validateDescriptionLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsFormat,
  'Хэш-тег должен начинаться с # и содержать только буквы и цифры (максимум 20 символов)'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsCount,
  `Максимум ${MAX_HASHTAGS_COUNT} хэш-тегов`
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsUniqueness,
  'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  descriptionInputElement,
  validateDescriptionLength,
  `Максимум ${MAX_DESCRIPTION_LENGTH} символов`
);

const isTextFieldFocused = () =>
  document.activeElement === hashtagsInputElement ||
  document.activeElement === descriptionInputElement;

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SUBMITTING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const closeForm = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  formElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();

  if (currentImageUrl) {
    URL.revokeObjectURL(currentImageUrl);
    currentImageUrl = null;
  }
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    const errorElement = document.querySelector('.error');
    if (!errorElement) {
      evt.preventDefault();
      closeForm();
    }
  }
}

const openForm = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  resetScale();
  resetEffects();

  document.addEventListener('keydown', onDocumentKeydown);
};

const updatePreview = () => {
  const file = fileInputElement.files[0];

  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isValidType) {
    if (currentImageUrl) {
      URL.revokeObjectURL(currentImageUrl);
    }

    currentImageUrl = URL.createObjectURL(file);
    previewImageElement.src = currentImageUrl;
    effectsPreviewElements.forEach((preview) => {
      preview.style.backgroundImage = `url('${currentImageUrl}')`;
    });
  }
};

const onFileInputChange = () => {
  updatePreview();
  openForm();
};

const onCloseButtonClick = () => {
  closeForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  blockSubmitButton();

  sendPicture(new FormData(formElement))
    .then(() => {
      closeForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(unblockSubmitButton);
};

fileInputElement.addEventListener('change', onFileInputChange);
closeButtonElement.addEventListener('click', onCloseButtonClick);
formElement.addEventListener('submit', onFormSubmit);

