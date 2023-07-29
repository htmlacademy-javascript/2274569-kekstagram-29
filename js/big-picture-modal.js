const QUANTITY_OF_COMMENTS = 5;

import {isEscapeKey} from './util.js';
import { data } from './api.js';

const collectionPosts = document.querySelector('.pictures');
const bigPhotoModal = document.querySelector('.big-picture');
const closeBigPhotoModal = document.querySelector('.big-picture__cancel');
const bigPhotoImage = document.querySelector('.big-picture__img').querySelector('img');
const bigPhotoLikes = document.querySelector('.likes-count');
const bigPhotoCountComments = document.querySelector('.comments-count');
const bigPhotoDescription = document.querySelector('.social__caption');
const bigPhotoComments = document.querySelector('.social__comments');
const templateComment = document.querySelector('.social__comment');
const commentAvatar = templateComment.querySelector('.social__picture');
const commentText = templateComment.querySelector('.social__text');
const commentsLoader = document.querySelector('.comments-loader');
const shownComments = document.querySelector('.shown-comments');
const arrayOfComments = [];
let countShownComments = 0;
let countPartComments = 0;
const onLoadButtonClick = () => renderSomeComment();

// <Закрытие модального окна>
const closeModal = () => {
  bigPhotoModal.classList.add('hidden');
  window.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onLoadButtonClick);
  document.body.classList.remove('modal-open');
  countShownComments = 0;
  arrayOfComments.length = 0;
};

// <Открытие модального окна>
const openModal = () => {
  bigPhotoModal.classList.remove('hidden');
  closeBigPhotoModal.addEventListener('click', () => {
    closeModal();
  });
  window.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};

// Функция закрытия модального окна по кнопке ESС
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// Создает список комментариев под фотографией
const createComments = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const comment = templateComment.cloneNode(true);
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;
    arrayOfComments.push(comment);
  });
  return arrayOfComments;
};

// Функция, которая получает id поста, на который кликнули и подставляет в модальное окно его данные
const createModalContent = (postId) => {
  const currentPost = data.find((post) => postId === post.id);
  const {likes, url, comments, description} = currentPost;
  bigPhotoImage.src = url;
  bigPhotoLikes.textContent = likes;
  bigPhotoCountComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;
  createComments(comments);
};

const showPartComments = () => {
  shownComments.textContent = countShownComments;
  const part = arrayOfComments.slice(countPartComments, countShownComments);
  for (let a = 0; a < part.length; a++) {
    bigPhotoComments.append(part[a]);
  }
};

function renderSomeComment () {
  countPartComments = countShownComments;
  if (arrayOfComments.length - countShownComments > QUANTITY_OF_COMMENTS) {
    countShownComments += QUANTITY_OF_COMMENTS;
  } else {
    countShownComments += arrayOfComments.length - countShownComments;
    commentsLoader.classList.add('hidden');
  }
  showPartComments();
}

const showComments = () => {
  if (arrayOfComments.length <= QUANTITY_OF_COMMENTS) {
    commentsLoader.classList.add('hidden');
    countShownComments = arrayOfComments.length;
    shownComments.textContent = countShownComments;
    for (let i = 0; i < countShownComments; i++) {
      bigPhotoComments.append(arrayOfComments[i]);
    }
  } else {
    commentsLoader.classList.remove('hidden');
    countPartComments = 0;
    countShownComments = QUANTITY_OF_COMMENTS;
    showPartComments();
    commentsLoader.addEventListener('click', onLoadButtonClick);
  }
};
// Показывает наполненное окно по клику
collectionPosts.addEventListener('click', (evt) => {
  bigPhotoComments.innerHTML = '';
  const target = evt.target.closest('.picture');
  let postId;
  if(target !== null) {
    postId = Number(target.dataset.id);
    createModalContent(postId);
    showComments();
    openModal();
  }
});
