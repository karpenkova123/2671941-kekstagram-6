import { renderThumbnails, clearThumbnails } from './thumbnails.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');

let currentFilter = FilterType.DEFAULT;
let pictures = [];

const getRandomPhotos = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      return getRandomPhotos(pictures);
    case FilterType.DISCUSSED:
      return getDiscussedPhotos(pictures);
    default:
      return [...pictures];
  }
};

const updatePhotos = () => {
  clearThumbnails();
  renderThumbnails(getFilteredPhotos());
};

const debouncedUpdatePhotos = debounce(updatePhotos, RERENDER_DELAY);

const onFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  if (evt.target.id === currentFilter) {
    return;
  }

  filtersFormElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  currentFilter = evt.target.id;
  debouncedUpdatePhotos();
};

const initFilters = (loadedPictures) => {
  pictures = loadedPictures;
  filtersElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', onFilterClick);
};

export { initFilters };
