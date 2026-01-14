const ALERT_SHOW_TIME = 5000;
const ALERT_Z_INDEX = '1000';

const showLoadError = (message) => {
  const containerElement = document.createElement('div');
  containerElement.classList.add('data-error');
  containerElement.style.position = 'fixed';
  containerElement.style.top = '0';
  containerElement.style.left = '0';
  containerElement.style.width = '100%';
  containerElement.style.padding = '20px';
  containerElement.style.backgroundColor = '#ff5635';
  containerElement.style.color = '#ffffff';
  containerElement.style.fontSize = '20px';
  containerElement.style.textAlign = 'center';
  containerElement.style.zIndex = ALERT_Z_INDEX;
  containerElement.textContent = message;

  document.body.appendChild(containerElement);

  setTimeout(() => {
    containerElement.remove();
  }, ALERT_SHOW_TIME);
};

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');

  if (messageElement) {
    messageElement.remove();
  }

  document.removeEventListener('keydown', onMessageKeydown);
  document.removeEventListener('click', onOutsideClick);
};

function onMessageKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}

function onOutsideClick(evt) {
  const innerElement = document.querySelector('.success__inner') || document.querySelector('.error__inner');
  if (innerElement && !innerElement.contains(evt.target)) {
    hideMessage();
  }
}

const showMessage = (templateId, buttonClass) => {
  const templateElement = document.querySelector(`#${templateId}`);

  if (!templateElement) {
    return;
  }

  const messageElement = templateElement.content.cloneNode(true);

  document.body.appendChild(messageElement);

  const messageContainer = document.querySelector(`.${templateId}`);
  if (messageContainer) {
    messageContainer.style.zIndex = '9999';
  }

  const buttonElement = document.querySelector(`.${buttonClass}`);
  if (buttonElement) {
    buttonElement.addEventListener('click', hideMessage);
  }

  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  showMessage('success', 'success__button');
};

const showErrorMessage = () => {
  showMessage('error', 'error__button');
};

export { showLoadError, showSuccessMessage, showErrorMessage };
