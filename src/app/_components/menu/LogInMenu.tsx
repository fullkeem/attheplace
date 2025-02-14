import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/icons/menuArrow.svg';
import { useUserInfoStore } from '@/app/store/authStore';

interface LogInMenuProps {
  profile_image: string;
  nickname: string;
  toggleMenu: () => void;
}

export default function LogInMenu({
  profile_image,
  nickname,
  toggleMenu,
}: LogInMenuProps) {
  const clearUserInfo = useUserInfoStore((state) => state.clearUserInfo);

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUserInfo();
    toggleMenu();
    window.location.href = '/';
  };
  return (
    <>
      <li className="my-2 py-1">
        <div className="flex items-center gap-3">
          <div className="flexCenter relative h-14 w-14 rounded-full bg-white p-3">
            <Image
              src={profile_image}
              alt="프로필 이미지"
              fill
              className="rounded-full"
              sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
            />
          </div>

          <div>
            <p>반갑습니다!</p>
            <div>
              <strong>{nickname}</strong> 님
            </div>
          </div>
        </div>
        <div className="mt-5pxr w-full border border-gray-200" />
      </li>
      <li className="py-1">
        <Link href={'/mypage'} className="flexBetween" onClick={toggleMenu}>
          <div>마이페이지</div>
          <Image src={arrow} alt="" aria-hidden />
        </Link>
      </li>
      <li className="py-1">
        <button type="button" onClick={handleLogout} className="flexBetween">
          <div>로그아웃</div>
          <Image src={arrow} alt="" aria-hidden />
        </button>
      </li>
    </>
  );
}
