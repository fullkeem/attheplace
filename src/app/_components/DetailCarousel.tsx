'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

interface DetailCarouselProps {
  images: string[];
}

export default function DetailCarousel({ images }: DetailCarouselProps) {
  if (!images || images.length === 0) return null;

  return (
    <Swiper
      // Swiper에 필요한 모듈들
      modules={[EffectCoverflow, Pagination, Navigation]}
      effect="coverflow"
      // Coverflow 효과 상세 설정
      coverflowEffect={{
        rotate: 20, // 양옆 슬라이드가 기울어지는 각도 (기본 50 정도, 원하는 대로 조절)
        stretch: 0, // 슬라이드 간 벌어짐 (0이면 기본)
        depth: 300, // 3D 원근감 (값이 클수록 중앙 슬라이드가 앞에 있음)
        modifier: 1, // 효과 강도 (1 이상 설정해봐도 됨)
        slideShadows: true,
      }}
      // 여기서부터 일반 Swiper 옵션
      centeredSlides={true} // 중앙 슬라이드가 가운데 위치
      slidesPerView="auto" // 슬라이드 너비에 맞춰 자동 배치
      spaceBetween={10} // 슬라이드 간 간격
      grabCursor={true} // 커서를 '드래그' 형태로
      className="mySwiper w-full max-w-4xl" // Tailwind로 크기 조정
    >
      {images.map((img, idx) => (
        <SwiperSlide
          key={idx}
          className="flex h-full w-full items-center justify-center"
          style={{ width: 'auto', height: 'auto' }}
        >
          <div className="relative aspect-auto h-80 w-64 overflow-hidden rounded-lg target:h-450pxr tablet:w-300pxr desktop:h-500pxr desktop:w-380pxr">
            <Image
              src={img}
              fill
              alt={`카페 이미지 ${idx + 1}`}
              className="absolute h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
