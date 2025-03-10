import Image from 'next/image';
import Link from 'next/link';
import attheplace from '/public/icons/attheplaceLogo.svg';

export default function Home() {
  return (
    <div className="bgBox">
      <Image
        src={'/images/background/background_6.webp'}
        className="bgImage"
        alt=""
        fill
        priority
        aria-hidden="true"
      />
      <div className="w-96 px-5 desktop:w-500pxr">
        <Image
          src={attheplace}
          alt="attheplace 로고"
          className="mx-auto mt-5 desktop:mt-10 desktop:w-36"
        />
        <ul className="mt-3 flex flex-col items-center gap-10 rounded-xl bg-bgColor/70 p-6">
          <li className="flexCenter flex-col gap-1 text-center">
            <h2 className="font-serif font-semibold desktop:text-xl">
              All the place you need
            </h2>
            <p className="text-sm desktop:text-base">
              오직 당신을 위한 맞춤형 카페 찾기 플랫폼
            </p>
          </li>
          <li className="mainStyle">
            <h3 className="font-semibold desktop:text-xl">바쁜 당신을 위해</h3>
            <p className="text-sm desktop:text-base">
              1분도 안걸리는 간단한 설문으로 A부터 Z까지 나에게 맞는 공간을
              추천하는 맞춤 큐레이션
            </p>
          </li>
          <li className="mainStyle">
            <h3 className="font-semibold desktop:text-xl">
              지금 내 근처 어디든
            </h3>
            <p className="text-sm desktop:text-base">
              언제 어디서나 간편하게, 당신이 찾는 Place
            </p>
          </li>

          <li className="mainStyle">
            <h3 className="font-serif font-semibold desktop:text-xl">
              Being at the Place
            </h3>
            <Link
              href="/findingCafe"
              className="mx-auto rounded-sm bg-buttonColor px-6 py-3"
            >
              찾으러 가기
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
