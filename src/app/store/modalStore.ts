import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null; // 모달 내용
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
