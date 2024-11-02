'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCafeDetail } from '../api/cafeApi';
import { CafeInfoType } from '../store/cafeStore';

export const useFetchCafeDetail = (cafeId: number) => {
  return useQuery<CafeInfoType, Error>({
    queryKey: ['cafeDetail', cafeId],
    queryFn: () => fetchCafeDetail(cafeId),
  });
};
