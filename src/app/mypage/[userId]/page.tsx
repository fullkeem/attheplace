import { faker } from '@faker-js/faker';
import Image from 'next/image';
import CafeInfo from '@/app/_components/CafeInfo';

export default function Mypage() {
  return (
    <div className="mt-5 flex flex-col">
      <div className="flex flex-col items-center gap-3">
        <Image
          src={faker.image.avatar()}
          alt="프로필 이미지"
          width={100}
          height={100}
          className="rounded-full"
        />
        <strong>유저 이름</strong>
      </div>
      <div className="mt-10">
        <div className="flexBetween">
          <div className="mb-1">찜 목록</div>
          <button type="button" className="text-sm">
            편집
          </button>
        </div>
        <div className="w-full border" />
        <ul className="">
          <li className="mt-3 rounded-xl bg-gray-400/70">
            <CafeInfo />
          </li>
        </ul>
      </div>
    </div>
  );
}
