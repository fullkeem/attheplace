import api from './api';
import { UserLikeList } from '../store/authStore';

export const toggleLikeStatus = async (id: number): Promise<UserLikeList> => {
  const response = await api.patch(`/like/${id}`);
  return response.data;
};
