'use client';

import Image from 'next/image';

import { useState } from 'react';

import { useUserInfoStore, UserLikeList } from '../store/authStore';
import { useUpdateProfileImage } from '../hooks/useProfileImageQuery';

import CafeInfo from '@/app/_components/CafeInfo';
import ProfileImageModal from '../_components/ProfileImageModal';

import defaulProfile from '/public/images/defaultProfile.png';

export default function Mypage() {
  const { userInfo } = useUserInfoStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: updateProfileImage } = useUpdateProfileImage();

  const validLikeList = userInfo?.likeList.filter(
    (cafe) => cafe.cafe_id !== null && cafe.cafe_image !== null
  );

  return (
    <div className="bgBox">
      <Image
        src={'/images/background/mypage_bg.webp'}
        className="bgImage"
        alt=""
        fill
        priority
        aria-hidden="true"
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
      />
      <div className="mt-7 flex w-8/12 flex-col">
        {/* 프로필 이미지 및 유저 이름 */}
        <div className="flex flex-col items-center gap-3">
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative h-24 w-24 cursor-pointer"
          >
            <Image
              src={userInfo?.profile_image || defaulProfile}
              alt="Profile Image"
              sizes=""
              fill
              className="rounded-full"
            />
          </div>
          <strong>{userInfo?.nickname || '유저 이름'}</strong>
          {/* 유저 닉네임 */}
        </div>

        {/* 찜 목록 */}
        <div className="mt-10">
          <h3 className="mb-1">찜 목록</h3>
          <div className="w-full border" />
          <ul className="items-center gap-3 tablet:grid tablet:grid-cols-2 desktop:grid desktop:grid-cols-3">
            {validLikeList.length > 0 ? (
              validLikeList.map((cafe: UserLikeList) => (
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
          onClose={() => setIsModalOpen(false)}
          onUpload={(file) => {
            updateProfileImage(file);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}
