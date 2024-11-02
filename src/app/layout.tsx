import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import Menu from './_components/NavMenu';
import RandomBackground from './_components/RandomBackground';
import UseReactQuery from './hooks/UseReactQuey';

export const metadata: Metadata = {
  title: 'At The Place',
  description:
    '사용자의 카페 취향을 조사해 딱 맞는 장소를 찾아주는 플랫폼입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative flex h-dvh flex-col">
        <UseReactQuery>
          <RandomBackground />
          <header className="flexCenter relative z-10 w-full bg-[url('/images/blackBg.webp')] bg-cover bg-center bg-no-repeat px-10 py-5">
            <h1 className="self-center font-serif text-xl leading-5 text-slate-200 underline underline-offset-2">
              <Link href="/">AT THE PLACE</Link>
            </h1>
            <Menu />
          </header>
          <main className="flex h-full flex-col items-center">{children}</main>
        </UseReactQuery>
      </body>
    </html>
  );
}
