export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Musafir');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dg9qxalvh/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};