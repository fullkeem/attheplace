'use client';

import { useEffect, useState } from 'react';

export default function LoadingOverlay() {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 1));
    }, 500); // 0.5초마다 점이 추가됨
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="text-center text-white">
        <div className="mb-4 font-serif text-2xl font-semibold">
          AT THE PLACE
        </div>
        <div className="text-lg font-medium">Loading{'.'.repeat(dotCount)}</div>
      </div>
    </section>
  );
}
