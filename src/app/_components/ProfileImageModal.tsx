'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function ProfileImageModal({
  isOpen,
  onClose,
  onUpload,
}: ProfileImageModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // 미리보기 설정
    }
  };

  const handleUploadClick = () => {
    if (selectedImage) {
      onUpload(selectedImage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flexCenter fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="relative rounded-lg bg-white p-4 shadow-lg">
        <div className="flexCenter relative h-40 w-40 overflow-hidden rounded-full">
          <Image
            src={previewImage || '/images/attheplaceBg.webp'} // 미리보기 이미지
            alt="Profile Preview"
            fill
          />
          <label className="flexCenter absolute inset-0 cursor-pointer bg-black bg-opacity-50">
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <Image
              src="/icons/camera.svg"
              alt="Camera Icon"
              width={30}
              height={30}
            />
          </label>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleUploadClick}
            className="bg-confirmColor rounded px-4 py-2 text-white"
          >
            예
          </button>
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
