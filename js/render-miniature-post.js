import { getData } from './api.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');
const postListFragment = document.createDocumentFragment();


const renderMitiature = (users) => {
  users.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    postListFragment.append(pictureElement);
  });

  picturesBlock.append(postListFragment);
};

getData()
  .then((users) => {
    renderMitiature(users);
  });
