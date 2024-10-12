import Image from "next/image";
import menuIcon from "/public/icons/menuIcon.svg";
import attheplace from "/public/icons/attheplaceLogo.svg";

export default function Home() {
  return (
    <div className="h-dvh relative flex items-center flex-col bg-custom-gradient">
      <header className="w-full mt-6 px-10 relative z-10 flex justify-center items-center">
        <h1 className="text-black font-serif text-xl leading-5 underline self-center">
          AT THE PLACE
        </h1>
        <Image
          src={menuIcon}
          width={25}
          height={25}
          className="absolute right-5"
          alt="메뉴"
        />
      </header>
      <main className="mt-10 mx-auto">
        <article className="flex flex-col bg-[url('/images/sectionBox.png')] bg-no-repeat bg-[length:100%_100%] w-[310px] h-[630px]">
          <Image
            src={attheplace}
            width={40}
            height={40}
            alt="attheplace 로고"
            className="mx-auto mt-5"
          />
          <ul className="flex flex-col items-center gap-14 p-8">
            <li>
              <h3 className="font-semibold">All the place you need</h3>
              <p className="text-sm">
                오직 당신을 위한 맞춤형 카페 찾기 플랫폼
              </p>
            </li>
            <li>
              <h3 className="font-semibold">바쁜 당신을 위해</h3>
              <p className="text-sm">
                1분도 안걸리는 간단한 설문으로 A부터 Z까지 나에게 맞는 공간을
                추천하는 맞춤 큐레이션
              </p>
            </li>
            <li>
              <h3 className="font-semibold">지금 내 근처 어디든</h3>
              <p className="text-sm">
                언제 어디서나 간편하게, 당신이 찾는 Place
              </p>
            </li>
            <li className="flex flex-col gap-3">
              <div className="font-serif font-semibold">Being at the Place</div>
              <button className="bg-slate-500 p-2">찾으러 가기</button>
            </li>
          </ul>
        </article>
      </main>
    </div>
  );
}
