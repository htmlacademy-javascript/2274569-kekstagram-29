import {isEscapeKey} from './util.js';
import {createModalContent} from './big-picture-details.js';
import {renderComments} from './comments-list.js';
import './comments-list.js';

const collectionPosts = document.querySelector('.pictures');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPhotoModal = document.querySelector('.big-picture');
const closeBigPhotoModal = document.querySelector('.big-picture__cancel');

const closeModal = () => {
  bigPhotoModal.classList.add('hidden');
  window.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

const openModal = () => {
  bigPhotoModal.classList.remove('hidden');
  closeBigPhotoModal.addEventListener('click', () => {
    closeModal();
  });

  window.addEventListener('keydown', onDocumentKeydown);
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

collectionPosts.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  let postId;
  if(target !== null) {
    postId = Number(target.dataset.id);
  }
  renderComments(postId);
  createModalContent(postId);
  openModal();
});
