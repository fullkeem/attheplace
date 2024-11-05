import { useMutation } from '@tanstack/react-query';
import { updateProfileImage } from '../api/imageApi';
import { useUserInfoQuery } from './useAuthQuery';

export const useUpdateProfileImage = () => {
  const { refetch } = useUserInfoQuery();

  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      refetch();
    },
  });
};
