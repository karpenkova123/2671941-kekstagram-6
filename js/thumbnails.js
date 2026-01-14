import { openBigPicture } from './big-picture.js';

const containerElement = document.querySelector('.pictures');

const createThumbnailElement = (picture) => {
  const templateElement = document.querySelector('#picture').content;
  const thumbnailFragment = templateElement.cloneNode(true);

  const linkElement = thumbnailFragment.querySelector('.picture');
  const imageElement = thumbnailFragment.querySelector('.picture__img');
  const likesElement = thumbnailFragment.querySelector('.picture__likes');
  const commentsElement = thumbnailFragment.querySelector('.picture__comments');

  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  likesElement.textContent = picture.likes;
  commentsElement.textContent = picture.comments.length;

  linkElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return thumbnailFragment;
};

const clearThumbnails = () => {
  const pictureElements = containerElement.querySelectorAll('.picture');
  pictureElements.forEach((picture) => picture.remove());
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnailElement(picture);
    fragment.appendChild(thumbnailElement);
  });

  containerElement.appendChild(fragment);
};

export { renderThumbnails, clearThumbnails };
