"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RandomBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const pathname = usePathname();

  const images = [
    "/images/background/background_1.webp",
    "/images/background/background_2.webp",
    "/images/background/background_3.webp",
    "/images/background/background_4.webp",
    "/images/background/background_5.webp",
    "/images/background/background_6.webp",
    "/images/background/background_7.webp",
    "/images/background/background_8.webp",
  ];

  //이미지 랜덤
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = backgroundImage;

  //   img.onload = () => {
  //     setBackgroundImage(img.src);
  //   };
  // }, [backgroundImage]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = backgroundImage;
    link.as = "image";
    document.head.appendChild(link);
  }, [backgroundImage]);

  useEffect(() => {
    const randomImage = getRandomImage();
    setBackgroundImage(randomImage);
  }, [pathname]);

  return (
    <div
      className="w-full h-dvh bg-no-repeat bg-cover  flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
}
