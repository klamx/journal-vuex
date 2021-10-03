import axios from 'axios';

const uploadImage = async (file) => {
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append('upload_preset', 'd2tenjxt');
    formData.append('file', file);

    const url = 'https://api.cloudinary.com/v1_1/df6loeq03/image/upload';
    const { data } = await axios.post(url, formData);
    return data.secure_url;
  } catch (error) {
    console.log('Error al cargar la imagen, revisar logs');
    console.error(error);
  }
};

export default uploadImage;
