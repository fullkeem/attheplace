import Image from 'next/image';
import { useUserInfoStore } from '@/app/store/authStore';
import MenuItem from './MenuItem';

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
      <li className="my-2 py-1 desktop:hidden">
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
      <MenuItem label="마이페이지" href="/mypage" onClick={toggleMenu} />
      <MenuItem label="로그아웃" onClick={handleLogout} />
    </>
  );
}
