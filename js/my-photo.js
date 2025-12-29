const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadFile = document.querySelector('#upload-file');

const onUploadImageChange = () => {
  const file = uploadFile.files[0];

  if (FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it))) {

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      document.querySelector('.img-upload__preview img').src = reader.result;
      document.querySelector('.effects__list').querySelectorAll('span').forEach((evt) => {
        evt.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
};

uploadFile.addEventListener('change', onUploadImageChange);
