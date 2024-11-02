import api from './api';
import { UserLikeList } from '../store/authStore';

export const toggleLikeStatus = async (
  cafeId: number
): Promise<UserLikeList> => {
  const response = await api.patch(`/like/${cafeId}`);
  return response.data;
};
