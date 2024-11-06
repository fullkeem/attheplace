'use client';

import Image from 'next/image';
import { useState } from 'react';
import CafeInfo from '@/app/_components/CafeInfo';
import { useUserInfoQuery } from '../hooks/useAuthQuery';
import { useUserInfoStore, UserLikeList } from '../store/authStore';
import { useUpdateProfileImage } from '../hooks/useProfileImageQuery';
import ProfileImageModal from '../_components/ProfileImageModal';

export default function Mypage() {
  const { userInfo } = useUserInfoStore();
  const { isLoading } = useUserInfoQuery();
  const { mutate: updateProfileImage } = useUpdateProfileImage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageUpload = (file: File) => {
    updateProfileImage(file);
    closeModal();
  };

  if (!userInfo || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-7 flex w-8/12 flex-col">
      {/* 프로필 이미지 및 유저 이름 */}
      <div className="flex flex-col items-center gap-3">
        <div onClick={openModal} className="relative h-24 w-24 cursor-pointer">
          <Image
            src={userInfo.profile_image || '/images/coffee.png'}
            alt="Profile"
            fill
            className="rounded-full"
          />
        </div>
        <strong>{userInfo?.nickname || '유저 이름'}</strong> {/* 유저 닉네임 */}
      </div>

      {/* 찜 목록 */}
      <div className="mt-10">
        <div className="flexBetween">
          <div className="mb-1">찜 목록</div>
          <button type="button" className="text-sm">
            편집
          </button>
        </div>
        <div className="w-full border" />

        <ul>
          {userInfo?.likeList && userInfo?.likeList.length > 0 ? (
            userInfo?.likeList.map((cafe: UserLikeList) => (
              <CafeInfo cafe={cafe} key={cafe.cafe_id} />
            ))
          ) : (
            <p className="mt-3">찜한 카페가 없습니다.</p>
          )}
        </ul>
      </div>

      {/* 모달창 */}
      <ProfileImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpload={handleImageUpload}
      />
    </div>
  );
}
