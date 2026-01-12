import { renderGallery } from './full-photo.js';
import { showSuccessMessage, showErrorMessage } from './data.js';
import { hideModal, setOnFormSubmit } from './form.js';
import { getData, sendData } from './fetch.js';
import { showAlert, debounce } from './util.js';
import { init, getFilterPictures } from './filter.js';
import './my-photo.js';

// Основная асинхронная функция
async function main() {
  try {
    init(await getData(), debounce(renderGallery));
    renderGallery(getFilterPictures());
  } catch (err) {
    showAlert(err.message);
  }

  setOnFormSubmit(async (data) => {
    try {
      await sendData(data);
      hideModal();
      showSuccessMessage();
    } catch (err) {
      showErrorMessage();
    }
  });
}

// Запуск
main();
