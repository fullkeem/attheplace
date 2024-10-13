import "./globals.css";
import type { Metadata } from "next";
import Menu from "./_components/NavMenu";

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
      <body className="h-dvh relative bg-custom-gradient flex items-center flex-col antialiased">
        <header className="w-full mt-6 px-10 relative z-10 flex justify-center items-center">
          <h1 className="text-black font-serif text-xl leading-5 underline self-center">
            AT THE PLACE
          </h1>
          <Menu />
        </header>
        <main className="mt-10 mx-auto">
          <article className="flex flex-col bg-[url('/images/sectionBox.png')] bg-no-repeat bg-[length:100%_100%] w-[310px] h-[630px]">
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}
