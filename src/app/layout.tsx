import './globals.css';
import type { Metadata } from 'next';
import Header from './_components/Header';
import Modal from './_components/Modal';
import UseReactQuery from './hooks/UseReactQuey';

export const metadata: Metadata = {
  title: 'At The Place',
  description:
    '사용자의 카페 취향을 조사해 딱 맞는 장소를 찾아주는 플랫폼입니다.',
  keywords: '카페 추천, 맞춤형 카페, 주차 가능한 카페, 분위기 좋은 카페',
  authors: [{ name: 'At The Place', url: 'https://attheplace.vercel.app' }],
  openGraph: {
    type: 'website',
    url: 'https://attheplace.vercel.app',
    title: 'At The Place - 맞춤형 카페 찾기 플랫폼',
    description:
      '사용자의 취향에 맞는 카페를 찾아주는 플랫폼입니다. 다양한 조건을 바탕으로 최적의 장소를 추천합니다.',
    images: [
      {
        url: 'https://attheplace.vercel.app/icons/attheplaceLogo.svg',
        width: 630,
        height: 630,
        alt: 'At The Place',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="relative mx-auto flex h-dvh min-w-375pxr max-w-[1280px] flex-col">
        <UseReactQuery>
          <Header />
          <main className="flex min-h-screen flex-col items-center">
            {children}
          </main>
          <Modal />
        </UseReactQuery>
      </body>
    </html>
  );
}
