'use client';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import arrow from '/public/icons/menuArrow.svg';
import { useState, useRef, useEffect } from 'react';
import { useCafeListStore } from '../store/cafeStore';
import { useUserInfoStore } from '../store/authStore';
import { useAllCafeQuery } from '../hooks/useCafeQuery';

export default function Menu() {
  const { refetch } = useAllCafeQuery();
  const { setFilteredCafes } = useCafeListStore();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo, clearUserInfo } = useUserInfoStore();
  const isLoggin = !!userInfo.nickname;

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

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUserInfo();
    toggleMenu();
    window.location.href = '/';
  };

  // 전체 카페 리스트 데이터 요청
  const handleMapClick = async () => {
    try {
      setIsMenuOpen((prevState) => !prevState);
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
    "fixed top-0 right-0 w-6/12 h-full z-40 transform transition-transform duration-300 bg-[url('/images/blackBg.webp')] bg-cover bg-center",
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
            <>
              <li className="my-2 py-1">
                <div className="flex items-center gap-3">
                  <div className="flexCenter relative h-14 w-14 rounded-full bg-white p-3">
                    <Image
                      src={userInfo.profile_image}
                      alt="프로필 이미지"
                      fill
                      className="rounded-full"
                      objectFit="cover"
                    />
                  </div>

                  <div>
                    <p>반갑습니다!</p>
                    <div>
                      <strong>{userInfo.nickname}</strong> 님
                    </div>
                  </div>
                </div>
                <div className="mt-5pxr w-full border border-gray-200" />
              </li>
              <li className="py-1">
                <Link
                  href={'/mypage'}
                  className="flexBetween"
                  onClick={toggleMenu}
                >
                  <div>마이페이지</div>
                  <Image src={arrow} alt="" aria-hidden />
                </Link>
              </li>
              <li className="py-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flexBetween"
                >
                  <div>로그아웃</div>
                  <Image src={arrow} alt="" aria-hidden />
                </button>
              </li>
            </>
          ) : (
            // 비로그인 상태일 때
            <>
              <li className="py-1">
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="flexBetween"
                >
                  <div>로그인</div>
                  <Image src={arrow} alt="" aria-hidden />
                </Link>
              </li>
              <li className="py-1">
                <Link
                  href="/signup"
                  onClick={toggleMenu}
                  className="flexBetween"
                >
                  <div>회원가입</div>
                  <Image src={arrow} alt="" aria-hidden />
                </Link>
              </li>
            </>
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
