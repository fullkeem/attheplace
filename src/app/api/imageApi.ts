import api from './api';

export const updateProfileImage = async (profileImage: File) => {
  const formData = new FormData();
  formData.append('profileImage', profileImage);

  const response = await api.patch('/mypage/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
