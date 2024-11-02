'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RandomBackground() {
  const [backgroundImage, setBackgroundImage] = useState(
    '/images/background/background_1.webp'
  );
  const pathname = usePathname();

  const images = [
    '/images/background/background_1.webp',
    '/images/background/background_2.webp',
    '/images/background/background_3.webp',
    '/images/background/background_4.webp',
    '/images/background/background_5.webp',
    '/images/background/background_6.webp',
    '/images/background/background_7.webp',
    '/images/background/background_8.webp',
    '/images/background/background_9.webp',
    '/images/background/background_11.webp',
  ];

  //이미지 랜덤
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    const img = new window.Image();
    const randomImage = getRandomImage();
    img.src = randomImage;

    img.onload = () => {
      setBackgroundImage(randomImage);
    };
  }, [pathname]);

  return (
    <div className="absolute z-[-1] flex h-dvh w-dvw overflow-hidden">
      <picture className="relative h-full w-full">
        <Image
          src={backgroundImage}
          className="h-full w-full scale-110 bg-center bg-no-repeat blur-[2px]"
          alt=""
          fill
          aria-hidden
        />
      </picture>
    </div>
  );
}
