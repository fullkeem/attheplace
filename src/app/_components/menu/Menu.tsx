'use client';

import Image from 'next/image';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { useCafeListStore } from '@/app/store/cafeStore';
import { useUserInfoStore } from '@/app/store/authStore';
import { useAllCafeQuery } from '@/app/hooks/useCafeQuery';
import MenuItem from './MenuItem';
import LogInMenu from './LogInMenu';
import LogOutMenu from './LogOutMenu';

export default function Menu() {
  const { refetch } = useAllCafeQuery();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { setFilteredCafes } = useCafeListStore();
  const nickname = useUserInfoStore((state) => state.userInfo.nickname);
  const profile_image = useUserInfoStore(
    (state) => state.userInfo.profile_image
  );

  const isLoggin = !!nickname;

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick); // 클릭 이벤트 추가
    } else {
      document.removeEventListener('mousedown', handleOutsideClick); // 클릭 이벤트 제거
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  // 전체 카페 리스트 데이터 요청
  const handleMapClick = async () => {
    try {
      setIsMenuOpen(false);
      const { data } = await refetch(); // Map 클릭 시 데이터 요청
      if (data) {
        setFilteredCafes(data.cafes); // 가져온 모든 카페 데이터를 filteredCafes에 저장
      }
    } catch (error) {
      console.error('전체 카페 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  // 메뉴가 열리고 닫히는 설정
  const menuClasses = classNames(
    "fixed top-0 right-0 w-1/2 tablet:w-1/3 h-full z-40 transform transition-transform duration-300 bg-[url('/images/blackBg.webp')] bg-cover bg-center",
    'desktop:static desktop:flex desktop:items-center desktop:justify-between desktop:w-auto desktop:translate-x-0 desktop:transition-none',
    {
      'translate-x-0': isMenuOpen,
      'translate-x-full': !isMenuOpen,
    }
  );

  return (
    <>
      <button
        onClick={toggleMenu}
        className="absolute right-5 cursor-pointer desktop:hidden"
      >
        <Image src="/icons/menuIcon.svg" alt="메뉴" width={25} height={25} />
      </button>

      {/* 네비게이션 메뉴 */}
      <nav className={menuClasses} ref={menuRef}>
        <button
          className="absolute right-6 top-6 desktop:hidden"
          onClick={toggleMenu}
        >
          X
        </button>
        <ul className="mt-14 flex flex-col gap-5 p-6 desktop:mt-0 desktop:flex-row desktop:gap-8 desktop:px-6 desktop:py-4 desktop:text-lg">
          {isLoggin ? (
            // 로그인 상태일 때
            <LogInMenu
              profile_image={profile_image}
              nickname={nickname}
              toggleMenu={toggleMenu}
            />
          ) : (
            // 비로그인 상태일 때
            <LogOutMenu toggleMenu={toggleMenu} />
          )}
          <MenuItem
            label="취향 찾기"
            href="/findingCafe"
            onClick={toggleMenu}
          />
          <MenuItem label="지도" href="/map" onClick={handleMapClick} />
        </ul>
      </nav>
    </>
  );
}
