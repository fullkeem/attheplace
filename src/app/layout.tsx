import './globals.css';
import type { Metadata } from 'next';
import Header from './_components/Header';
import UseReactQuery from './hooks/UseReactQuey';
import Modal from './_components/Modal';

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
          <Header />
          <main className="flex min-h-screen flex-col items-center">
            {children}
          </main>
        </UseReactQuery>
        <Modal />
      </body>
    </html>
  );
}
