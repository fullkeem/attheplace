'use client';

import { Cafe } from '../store/cafeStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchAllCafes,
  fetchCafeDetail,
  fetchFilteringCafeData,
} from '../api/cafeApi';

export const useFetchCafeDetail = (cafeId: number) => {
  return useQuery<Cafe, Error>({
    queryKey: ['cafeDetail', cafeId],
    queryFn: () => fetchCafeDetail(cafeId),
    staleTime: 1000 * 60 * 5,
  });
};

// 필터링된 카페 리스트 가져오기
export const useCafeFilterQuery = () => {
  return useMutation({
    mutationFn: fetchFilteringCafeData,
  });
};

// 모든 카페 데이터를 받아서 저장
export const useAllCafeQuery = () => {
  return useQuery({
    queryKey: ['cafeList'],
    queryFn: fetchAllCafes,
  });
};
