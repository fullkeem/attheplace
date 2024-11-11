'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import StaticMap from '@/app/_components/StaticMap';
import { fetchCafeDetail } from '@/app/api/cafeApi';
import { useModalStore } from '@/app/store/modalStore';
import { useRouter, useParams } from 'next/navigation';
import { useCafeInfoStore } from '@/app/store/cafeStore';
import { useUserInfoStore } from '@/app/store/authStore';
import { useUserInfoQuery } from '@/app/hooks/useAuthQuery';
import LoadingOverlay from '@/app/_components/LoadingOverlay';
import { useLikeToggleMutation } from '@/app/hooks/userLikeListQuery';

export default function Detail() {
  const router = useRouter();
  const params = useParams(); // useParams를 사용하여 URL 파라미터를 가져옴
  const { openModal, closeModal } = useModalStore();
  const { refetch } = useUserInfoQuery(); // 유저 정보를 최신 상태로 가져오는 쿼리
  const { userInfo } = useUserInfoStore();
  const toggleLikeMutation = useLikeToggleMutation();
  const { cafeInfo, setCafeInfo, clearCafeInfo } = useCafeInfoStore();
  const isLiked = userInfo.likeList.some(
    (cafe) => cafe.cafe_id === cafeInfo?.id
  );

  useEffect(() => {
    const loadCafeDetail = async () => {
      const cafeId = Number(params.cafeId); // useParams로 가져온 cafeId 사용
      if (cafeId) {
        try {
          const cafeData = await fetchCafeDetail(cafeId);
          setCafeInfo(cafeData);
        } catch (error) {
          console.error('카페 정보를 가져오는 데 실패했습니다.', error);
        }
      }
    };

    loadCafeDetail();

    // 컴포넌트 언마운트 시 상태 초기화
    return () => {
      clearCafeInfo();
    };
  }, [params.cafeId, setCafeInfo, clearCafeInfo]);

  // 좋아요 등록/취소
  const handleLikeToggle = () => {
    if (!cafeInfo) return;

    if (!userInfo || !userInfo.nickname) {
      openModal(
        <div className="p-5">
          <p className="text-black">로그인이 필요한 서비스입니다.</p>
          <div className="flexBetween mt-6">
            <button
              onClick={() => {
                closeModal();
                router.push('/login');
              }}
              className="w-full rounded bg-[#FF6347] px-4 py-2 text-white"
            >
              확인
            </button>
          </div>
        </div>
      );
      return;
    }
    toggleLikeMutation.mutate(cafeInfo.id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  // 카페 정보 불러오기
  if (!cafeInfo) {
    return <LoadingOverlay />;
  }

  return (
    <div className="relative flex w-full flex-grow justify-center">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <Image
          src={cafeInfo.image_main}
          className="blur-4pxr scale-110 object-cover"
          alt=""
          fill
          priority
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto w-full">
        <div className="flexBetween fixed top-0 z-10 mt-0 bg-[#353434]/70 px-5 py-2">
          <button type="button" onClick={() => router.back()}>
            <Image
              src={'/icons/backArrow.svg'}
              width={25}
              height={25}
              alt="뒤로 가기"
            />
          </button>

          <h1 className="text-lg font-bold">{cafeInfo.cafe_name}</h1>

          <button type="button" onClick={handleLikeToggle}>
            <Image
              src={
                isLiked ? '/icons/heart_filled.svg' : '/icons/heart_outline.svg'
              }
              width={25}
              height={25}
              alt="좋아요"
            />
          </button>
        </div>

        <picture className="mt-14 flex justify-center">
          <Image
            src={cafeInfo.image_main}
            width={200}
            height={200}
            className="rounded-lg"
            alt="카페 대표사진"
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </picture>

        <section className="mx-2 mt-5 rounded-lg bg-[#353434]/70 p-4">
          <h2 className="text-lg font-extrabold">카페 정보</h2>
          <div className="h-1pxr w-full bg-white" />
          <ul className="mt-2 flex flex-col gap-1">
            <li className="cafeInfo" role="contentInfo">
              <h3 className="cafeInfoKey">영업 시간 </h3>
              <p className="cafeInfoValue">{cafeInfo.opening_hours}</p>
            </li>

            <li className="cafeInfo" role="contentInfo">
              <h3 className="cafeInfoKey">카페 위치 </h3>
              <p className="cafeInfoValue">{cafeInfo.location}</p>
            </li>

            <li className="cafeInfo" role="contentInfo">
              <h3 className="cafeInfoKey">연락처 </h3>
              <p className="cafeInfoValue">{cafeInfo.contact_number}</p>
            </li>

            <li className="cafeInfo" role="contentInfo">
              <h3 className="cafeInfoKey">
                <Image
                  src={'/icons/instagramSimple.svg'}
                  width={30}
                  height={30}
                  alt="인스타그램 주소"
                />
              </h3>

              {cafeInfo.sns_account ? (
                <Link
                  href={cafeInfo.sns_account}
                  className="cafeInfoValue underline-offset-6pxr underline"
                  target="_blank"
                >
                  {cafeInfo.sns_account
                    .replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
                    .replace(/\/$/, '') || cafeInfo.sns_account}
                </Link>
              ) : (
                'X'
              )}
            </li>
          </ul>

          <div className="flexBetween mt-5 gap-4">
            <Image
              src={cafeInfo.image_menu}
              alt="메뉴판"
              width={140}
              height={200}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
            <StaticMap
              latitude={cafeInfo.latitude}
              longitude={cafeInfo.longitude}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
