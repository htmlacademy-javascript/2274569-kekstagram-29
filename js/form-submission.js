import { isEscapeKey } from './util.js';
import { pristine, imgUploadForm } from './form-validate.js';
import { sendData } from './api.js';
import { closeForm } from './upload-form.js';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const uploadButton = document.querySelector('.img-upload__submit');

const ButtonClass = {
  ERROR: '.error__button',
  SUCCESS: '.success__button',
};

const closeMessage = () => {
  const messages = document.querySelector('.error') || document.querySelector('.success');
  messages.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onBodyClick);
};

const showMessage = (message, buttonMessage) => {
  document.body.append(message);
  message.querySelector(buttonMessage).addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onBodyClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onBodyClick (evt) {
  if (evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  closeMessage();
}

const showSuccessMessage = () => showMessage(successMessage, ButtonClass.SUCCESS);
const showErrorMessage = () => showMessage(errorMessage, ButtonClass.ERROR);

const blockUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Публикую...';
};

const unblockUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};

const sendDataSuccess = async (data) => {
  try {
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
};

imgUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockUploadButton();
    const formData = new FormData(evt.target);
    await sendDataSuccess(formData);
    unblockUploadButton();
  }
});
