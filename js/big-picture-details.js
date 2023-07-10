import {createPosts} from './data.js';

const bigPhotoImage = document.querySelector('.big-picture__img').querySelector('img');
const bigPhotoLikes = document.querySelector('.likes-count');
const bigPhotoCountComments = document.querySelector('.comments-count');
const bigPhotoDescription = document.querySelector('.social__caption');

const createModalContent = (postId) => {
  const currentPost = createPosts.find((post) => postId === post.id);
  const {url, likes, comments, description} = currentPost;
  bigPhotoImage.src = url;
  bigPhotoLikes.textContent = likes;
  bigPhotoCountComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;
};

export {createModalContent};
