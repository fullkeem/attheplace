import { create } from 'zustand';

/** 진행바 */
interface Progress {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useProgressBarStore = create<Progress>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}));

export interface CafeInfoType {
  id: number;
  cafeName: string;
  openingHours: string;
  location: string;
  latitude: number;
  longitude: number;
  contactNumber: string;
  sns: string;
}

interface CafeStore {
  cafeInfo: CafeInfoType | null;
  setCafeInfo: (cafe: CafeInfoType) => void;
  clearCafeInfo: () => void;
}

export const useCafeInfoStore = create<CafeStore>((set) => ({
  cafeInfo: null,
  setCafeInfo: (cafe) => set({ cafeInfo: cafe }),
  clearCafeInfo: () => set({ cafeInfo: null }),
}));
