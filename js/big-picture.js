const COMMENTS_PER_PORTION = 5;
const AVATAR_SIZE = 35;

const bigPictureElement = document.querySelector('.big-picture');
const pictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bodyElement = document.body;

let shownCommentsCount = 0;
let currentComments = [];

const createCommentElement = (comment) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const avatarImage = document.createElement('img');
  avatarImage.classList.add('social__picture');
  avatarImage.src = comment.avatar;
  avatarImage.alt = comment.name;
  avatarImage.width = AVATAR_SIZE;
  avatarImage.height = AVATAR_SIZE;

  const messageText = document.createElement('p');
  messageText.classList.add('social__text');
  messageText.textContent = comment.message;

  commentItem.appendChild(avatarImage);
  commentItem.appendChild(messageText);

  return commentItem;
};

const updateCommentsCounter = () => {
  const shownCountElement = commentCountElement.querySelector('.social__comment-shown-count');
  const totalCountElement = commentCountElement.querySelector('.social__comment-total-count');

  if (!shownCountElement) {
    commentCountElement.innerHTML = `<span class="social__comment-shown-count">${shownCommentsCount}</span> из <span class="social__comment-total-count comments-count">${currentComments.length}</span> комментариев`;
  } else {
    shownCountElement.textContent = shownCommentsCount;
    totalCountElement.textContent = currentComments.length;
  }
};

const renderComments = () => {
  shownCommentsCount += COMMENTS_PER_PORTION;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
    shownCommentsCount = currentComments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  const renderedCommentsCount = commentsContainerElement.children.length;
  const commentsToRender = currentComments.slice(renderedCommentsCount, shownCommentsCount);

  commentsToRender.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  commentsContainerElement.appendChild(fragment);

  updateCommentsCounter();
};

const onLoaderClick = () => {
  renderComments();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onLoaderClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (picture) => {
  pictureImageElement.src = picture.url;
  likesCountElement.textContent = picture.likes;
  captionElement.textContent = picture.description;

  currentComments = picture.comments;
  shownCommentsCount = 0;

  commentsContainerElement.innerHTML = '';

  renderComments();

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentCountElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onLoaderClick);
};

closeButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };
