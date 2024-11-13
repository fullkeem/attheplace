'use client';

import { useModalStore } from '@/app/store/modalStore';

export default function Modal() {
  const { isOpen, content } = useModalStore();

  // const handleBackdropClick = (event: React.MouseEvent) => {
  //   if (event.target === event.currentTarget) {
  //     closeModal();
  //   }
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative rounded bg-white p-4 shadow-lg">{content}</div>
    </div>
  );
}
