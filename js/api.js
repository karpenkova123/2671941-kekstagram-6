const GET_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const POST_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/';

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить данные'
};

const loadPictures = () =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (err) {
          reject(new Error(ErrorText.GET_DATA));
        }
      } else {
        reject(new Error(ErrorText.GET_DATA));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error(ErrorText.GET_DATA));
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  });

const sendPicture = (formData) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(ErrorText.SEND_DATA));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error(ErrorText.SEND_DATA));
    });

    xhr.open('POST', POST_URL);
    xhr.send(formData);
  });

export { loadPictures, sendPicture };
