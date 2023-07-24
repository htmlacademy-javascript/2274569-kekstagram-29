import { sendData } from './api.js';
import { showAlertError, showAlertSuccess } from './util.js';
import { pristine } from './form-validate.js';
import { closeForm } from './upload-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showAlertSuccess('Форма удачно отправлена'))
        .catch(
          (err) => {
            showAlertError(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

setUserFormSubmit(closeForm);
