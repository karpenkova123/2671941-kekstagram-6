const showPicturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');

const createPicturesElement = ({url, description, likes, comments, id}) => {
  const showPictures = showPicturesTemplate.cloneNode(true);
  showPictures.querySelector('.picture__img').src = url;
  showPictures.querySelector('.picture__img').alt = description;
  showPictures.querySelector('.picture__likes').textContent = likes;
  showPictures.querySelector('.picture__comments').textContent = comments.length;
  showPictures.dataset.pictureId = id;
  return showPictures;
};

const renderPictures = (pictures) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const similarListFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    similarListFragment.append(createPicturesElement(picture));
  });

  container.append(similarListFragment);
};

export { renderPictures };
