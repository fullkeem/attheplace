'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import StaticMap from '@/app/_components/StaticMap';
import { fetchCafeDetail } from '@/app/api/cafeApi';
import { useParams } from 'next/navigation';
import { useCafeInfoStore } from '@/app/store/cafeStore';
import { useUserInfoStore } from '@/app/store/authStore';

import LoadingOverlay from '@/app/_components/LoadingOverlay';
import DetailHeader from '@/app/_components/DetailHeader';
import CafeInfoItem from '@/app/_components/CafeInfoItem';
import DetailCarousel from '@/app/_components/DetailCarousel';

export default function Detail() {
  const params = useParams(); // useParams를 사용하여 URL 파라미터를 가져옴
  const { userInfo } = useUserInfoStore();
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

  // 카페 정보 불러오기
  if (!cafeInfo) {
    return <LoadingOverlay />;
  }
  const images = [cafeInfo.image_main, cafeInfo.image_menu].filter(Boolean);
  return (
    <div className="flexCenter relative w-full flex-grow">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <Image
          src={cafeInfo.image_main}
          className="blur-4pxr scale-110 object-cover brightness-50"
          alt=""
          fill
          priority
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto w-full">
        <DetailHeader
          cafeInfo={cafeInfo}
          userInfo={userInfo}
          isLiked={isLiked}
        />
        <div className="flexCenter mx-auto mb-6 mt-20 flex-col">
          <DetailCarousel images={images} />

          <section className="mx-2 mt-5 w-3/4 items-center justify-between gap-4 rounded-lg bg-bgColor/70 p-4 tablet:w-2/3 desktop:flex desktop:w-2/3">
            <div className="desktop:flex-grow">
              <h2 className="text-lg font-extrabold">카페 정보</h2>
              <div className="h-1pxr w-full bg-white" />
              <ul className="mt-2 flex flex-col gap-1">
                <CafeInfoItem
                  label={'영업 시간'}
                  value={cafeInfo.opening_hours}
                />
                <CafeInfoItem label={'카페 위치'} value={cafeInfo.location} />
                <CafeInfoItem
                  label={'연락처'}
                  value={cafeInfo.contact_number}
                />
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
            </div>

            <div className="mx-auto mt-5 h-full w-2/3 tablet:mt-0 desktop:mt-0 desktop:w-1/3">
              <StaticMap
                latitude={cafeInfo.latitude}
                longitude={cafeInfo.longitude}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
