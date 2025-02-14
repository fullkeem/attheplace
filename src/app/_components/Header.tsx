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
    <header className="flexCenter fixed z-10 w-full max-w-[1280px] bg-[url('/images/blackBg.webp')] bg-cover bg-center bg-no-repeat py-5">
      <h1 className="self-center font-serif text-xl leading-5 text-slate-200 underline underline-offset-2">
        <Link href="/">AT THE PLACE</Link>
      </h1>
      <Menu />
    </header>
  );
}
