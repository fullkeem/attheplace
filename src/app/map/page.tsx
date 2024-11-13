'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useMap } from '../hooks/useMap';
import CafeCard from '../_components/CafeCard';
import { Cafe, useCafeListStore } from '../store/cafeStore';
import LoadingOverlay from '../_components/LoadingOverlay';

export default function Map() {
  const { filteredCafes } = useCafeListStore();
  const mapRef = useRef<null | naver.maps.Map>(null);
  const cafeCardRefs = useRef<{ [key: number]: HTMLLIElement | null }>({});

  // 커스텀 훅을 사용하여 지도와 마커 초기화
  useMap({
    mapRef,
    cafes: filteredCafes,
    onMarkerClick: (cafe) => handleMarkerClick(cafe),
  });

  // 카드 ref를 설정하는 콜백 함수를 변수에 저장
  const setCafeCardRef = (cafeId: number) => (el: HTMLLIElement | null) => {
    cafeCardRefs.current[cafeId] = el;
  };

  // 마커 클릭 시 지도 및 CafeCard 중앙 배치
  const handleMarkerClick = (cafe: Cafe) => {
    centerMapToMarker(cafe.latitude, cafe.longitude);
    centerCafeCard(cafe.id);
  };

  const centerMapToMarker = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.setCenter(new naver.maps.LatLng(latitude, longitude));
    }
  };

  const centerCafeCard = (cafeId: number) => {
    const cardElement = cafeCardRefs.current[cafeId];
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  // 현재 위치로 지도 중심 이동
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        centerMapToMarker(position.coords.latitude, position.coords.longitude);
      });
    }
  };

  const cafeImage = filteredCafes.map((data) => data.image_main);

  if (!cafeImage) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flexCenter relative h-full w-full">
      <div id="map" className="h-full w-full"></div>
      <button
        onClick={handleCurrentLocationClick}
        className="absolute left-5 top-5 rounded border-gray-300 bg-gray-300 p-2"
      >
        <Image
          src={'/icons/myLocation.svg'}
          alt="내 위치 찾기"
          width={25}
          height={25}
        />
      </button>
      <div className="absolute bottom-6 w-full px-5">
        <ul className="scrollbar-hide flex flex-row space-x-4 overflow-y-hidden overflow-x-scroll">
          {filteredCafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} ref={setCafeCardRef(cafe.id)} />
          ))}
        </ul>
      </div>
    </div>
  );
}
