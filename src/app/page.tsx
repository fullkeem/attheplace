import Image from "next/image";
import attheplace from "/public/icons/attheplaceLogo.svg";

export default function Home() {
  return (
    <>
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
          <p className="text-sm">오직 당신을 위한 맞춤형 카페 찾기 플랫폼</p>
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
          <p className="text-sm">언제 어디서나 간편하게, 당신이 찾는 Place</p>
        </li>
        <li className="flex flex-col gap-3">
          <div className="font-serif font-semibold">Being at the Place</div>
          <button className="bg-slate-500 p-2">찾으러 가기</button>
        </li>
      </ul>
    </>
  );
}
