"use client";

import { useEffect, useRef } from "react";

export default function CoffeeBeans() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const beansArray: {
      x: number;
      y: number;
      speed: number;
      img: HTMLImageElement;
    }[] = [];
    const coffeeBeanImage = new Image();
    coffeeBeanImage.src = "/images/coffee-bean.png"; // 원두 이미지 경로

    const createCoffeeBeans = () => {
      for (let i = 0; i < 20; i++) {
        // 원두 20개 생성
        const speed = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width!;
        const img = coffeeBeanImage.cloneNode() as HTMLImageElement;
        beansArray.push({ x, y: -50, speed, img });
      }
    };

    // 이미지가 로드되면 애니메이션을 시작
    coffeeBeanImage.onload = () => {
      createCoffeeBeans();
      updateCanvas();
    };

    const updateCanvas = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width!, canvas.height!);

      beansArray.forEach((bean) => {
        ctx.drawImage(bean.img, bean.x, bean.y, 50, 50); // 이미지 크기 설정
        bean.y += bean.speed; // 떨어지는 속도

        // 바닥에 닿으면 다시 위에서 떨어지도록 설정
        if (bean.y > canvas.height!) {
          bean.y = -50;
          bean.x = Math.random() * canvas.width!;
        }
      });

      requestAnimationFrame(updateCanvas); // 프레임마다 업데이트
    };

    // 캔버스 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 창 크기가 변경되면 캔버스 크기 업데이트
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  );
}
