import { createRandomPosts, showAlert, debounce } from './util.js';
import { data } from './api.js';
import { renderMiniature } from './render-miniature-post.js';

const imageFilters = document.querySelector('.img-filters');
const imageFilterDefault = document.querySelector('#filter-default');
let currentFilter = imageFilterDefault.id;

const copyPosts = data.slice();
const randomData = createRandomPosts(data);

const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;
const discussedData = copyPosts.sort(comparePosts);

const SortOption = {
  'filter-default': data,
  'filter-random': randomData,
  'filter-discussed': discussedData,
};

const renderPosts = () => {
  const array = SortOption[currentFilter];
  try {
    renderMiniature(array);
  } catch (err) {
    showAlert(err.message);
  }
};

const renderDebounce = debounce(() => {
  renderPosts();
});

const renderSortedPosts = () => {
  renderPosts(currentFilter);
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    imageFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    renderDebounce(currentFilter);
  });
};

export {renderSortedPosts};
