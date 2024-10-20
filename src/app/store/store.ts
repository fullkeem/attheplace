import { create } from 'zustand';

interface StoreState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useProgressBarStore = create<StoreState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}));
