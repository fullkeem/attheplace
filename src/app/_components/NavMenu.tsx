'use client';

import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import arrow from '/public/icons/menuArrow.svg';
import { useUserInfoStore } from '../store/authStore';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo, clearUserInfo } = useUserInfoStore();
  const isLoggin = !!userInfo.nickname;

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUserInfo();
    toggleMenu();
    window.location.href = '/';
  };

  // 메뉴가 열리고 닫히는 설정
  const menuClasses = classNames(
    "fixed top-0 right-0 w-10/12 h-full z-40 transform transition-transform duration-300 bg-[url('/images/blackBg.webp')] bg-cover bg-center",
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
      <nav className={menuClasses}>
        <button className="absolute right-6 top-6" onClick={toggleMenu}>
          X
        </button>
        <ul className="mt-14 flex flex-col gap-7 p-6">
          {isLoggin ? (
            // 로그인 상태일 때
            <>
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
            <Link href="/map" onClick={toggleMenu} className="flexBetween">
              <div>Map</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
