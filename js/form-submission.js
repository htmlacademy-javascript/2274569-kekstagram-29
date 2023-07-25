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

const sendDataSuccess = async (data) => {
  try {
    await sendData(data);
    closeForm();
    showAlertSuccess('Форма отправлена успешно');
  } catch {
    showAlertError('Не удалось отправить форму, попробуйте еще раз');
  }
};

imgUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    await sendDataSuccess(formData);
    unblockSubmitButton();
  }
});
