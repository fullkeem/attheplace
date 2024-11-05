import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** 진행바 */
interface Progress {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useProgressBarStore = create<Progress>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set(() => ({ currentStep: step })),
}));

export interface Cafe {
  id: number;
  cafe_name: string;
  image_main: string;
  image_menu: string;
  opening_hours: string;
  location?: string;
  location_address?: string;
  latitude: number;
  longitude: number;
  contact_number: string;
  sns_account: string;
}

interface CafeStore {
  cafeInfo: Cafe | null;
  setCafeInfo: (cafe: Cafe) => void;
  clearCafeInfo: () => void;
}

// 카페 정보
export const useCafeInfoStore = create<CafeStore>((set) => ({
  cafeInfo: null,
  setCafeInfo: (cafe) => set({ cafeInfo: cafe }),
  clearCafeInfo: () => set({ cafeInfo: null }),
}));

interface CafeListStore {
  filteredCafes: Cafe[];
  setFilteredCafes: (cafes: Cafe[]) => void;
}

// 필터링 카페 리스트
export const useCafeListStore = create<CafeListStore>()(
  persist(
    (set) => ({
      filteredCafes: [],
      setFilteredCafes: (cafes) => set({ filteredCafes: cafes }),
    }),
    {
      name: 'filteredCafes',
    }
  )
);
