'use client';

import { Cafe } from '../store/cafeStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCafeDetail, fetchFilteringCafeData } from '../api/cafeApi';

export const useFetchCafeDetail = (cafeId: number) => {
  return useQuery<Cafe, Error>({
    queryKey: ['cafeDetail', cafeId],
    queryFn: () => fetchCafeDetail(cafeId),
  });
};

export const useCafeFilterQuery = () => {
  return useMutation({
    mutationFn: fetchFilteringCafeData,
  });
};
