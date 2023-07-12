import {createPosts} from './data.js';

const bigPhotoComments = document.querySelector('.social__comments');
const templateComment = document.querySelector('.social__comment');

const renderComments = (postId) => {
  const clickPost = createPosts.find((post) => postId === post.id);
  const currentComments = clickPost.comments;
  const commentsContainer = document.createDocumentFragment();
  currentComments.forEach(({avatar, message, name}) => {
    const comment = templateComment.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsContainer.append(comment);
  });

  bigPhotoComments.innerHTML = '';
  bigPhotoComments.append(commentsContainer);
};

export {renderComments};

