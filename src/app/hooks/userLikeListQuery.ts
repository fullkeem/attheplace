'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLikeStatus } from '../api/likeApi';

export const useLikeToggleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cafeId: number) => toggleLikeStatus(cafeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
