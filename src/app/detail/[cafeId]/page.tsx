import Image from 'next/image';
import Link from 'next/link';

export default function Detail() {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <button type="button">
          <Image
            src={'/icons/backArrow.svg'}
            width={25}
            height={25}
            alt="뒤로 가기"
          />
        </button>

        <h1 className="text-lg font-bold">카페 이름</h1>

        <button type="button">
          <Image
            src={'/icons/heartIcon.svg'}
            width={25}
            height={25}
            alt="좋아요"
          />
        </button>
      </div>

      <picture className="mt-8 flex justify-center">
        <Image
          src={'/images/어반플렌트_2.jpeg'}
          width={270}
          height={200}
          className="rounded-lg"
          alt="카페 대표사진"
        />
      </picture>

      <section className="mt-10">
        <h2 className="text-lg">카페 정보</h2>
        <div className="h-[1px] w-full bg-white" />
        <ul className="mt-2 flex flex-col gap-1">
          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">영업 시간 </h3>
            <p>11:00-19:30</p>
          </li>

          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">카페 위치 </h3>
            <p>서울 마포구 동교로 139 1층</p>
          </li>

          <li className="flexBetween" role="contentInfo">
            <h3 className="font-bold">연락처 </h3>
            <p>02-3225-1984</p>
          </li>

          <li className="flexBetween" role="contentInfo">
            <h3>
              <Image
                src={'/icons/instagramSimple.svg'}
                width={30}
                height={30}
                alt="인스타그램 주소"
              />
            </h3>
            <Link
              href="https://www.instagram.com/_pimfycoffee"
              className="underline underline-offset-[6px]"
              target="_blank"
            >
              _pimfycoffee
            </Link>
          </li>
          <li className="mt-10">
            <Image
              src={'/images/어반_멘.jpeg'}
              alt="메뉴판"
              width={140}
              height={200}
              className="h-[200px]"
            />
          </li>
        </ul>
      </section>
    </div>
  );
}
