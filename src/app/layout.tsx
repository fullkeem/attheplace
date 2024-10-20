import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Menu from "./_components/NavMenu";
import RandomBackground from "./_components/RandomBackground";

export const metadata: Metadata = {
  title: "At The Place",
  description:
    "사용자의 카페 취향을 조사해 딱 맞는 장소를 찾아주는 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-dvh relative flex flex-col">
        <RandomBackground />
        <header className="w-full py-5 px-10 relative z-10 bg-[url('/images/blackBg.webp')] bg-no-repeat bg-cover bg-center flexCenter">
          <h1 className="text-slate-200 font-serif text-xl leading-5 underline underline-offset-2 self-center">
            <Link href="/">AT THE PLACE</Link>
          </h1>
          <Menu />
        </header>
        <main className="mt-5 mx-auto">
          <article className="flex flex-col w-[310px] h-[630px]">
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}
