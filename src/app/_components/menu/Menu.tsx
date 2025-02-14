'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import arrow from '/public/icons/menuArrow.svg';
import { useCafeListStore } from '@/app/store/cafeStore';
import { useUserInfoStore } from '@/app/store/authStore';
import { useAllCafeQuery } from '@/app/hooks/useCafeQuery';
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
    "fixed top-0 right-0 w-1/3 h-full z-40 transform transition-transform duration-300 bg-[url('/images/blackBg.webp')] bg-cover bg-center",
    {
      'translate-x-0': isMenuOpen,
      'translate-x-full': !isMenuOpen,
    }
  );

  return (
    <>
      <button onClick={toggleMenu} className="absolute right-5 cursor-pointer">
        <Image src="/icons/menuIcon.svg" alt="메뉴" width={25} height={25} />
      </button>

      {/* 네비게이션 메뉴 */}
      <nav className={menuClasses} ref={menuRef}>
        <button className="absolute right-6 top-6" onClick={toggleMenu}>
          X
        </button>
        <ul className="mt-14 flex flex-col gap-5 p-6">
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

          <li className="py-1">
            <Link
              href="/findingCafe"
              onClick={toggleMenu}
              className="flexBetween"
            >
              <div>Test</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>
          <li className="py-1">
            <Link href="/map" onClick={handleMapClick} className="flexBetween">
              <div>Map</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
