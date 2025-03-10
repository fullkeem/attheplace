'use client';

import Link from 'next/link';
import Menu from './menu/Menu';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // 경로에 '/detail'이 포함되면 헤더를 숨김
  if (pathname.includes('/detail')) {
    return null;
  }
  return (
    <header className="fixed z-10 flex w-full max-w-[1280px] justify-center bg-[url('/images/blackBg.webp')] bg-cover bg-center bg-no-repeat py-5 desktop:justify-between desktop:py-0">
      <h1 className="self-center font-serif text-xl leading-5 text-slate-200 underline underline-offset-2">
        <Link href="/" className="px-6 py-4 desktop:text-2xl">
          AT THE PLACE
        </Link>
      </h1>
      <Menu />
    </header>
  );
}
