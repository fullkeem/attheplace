'use client';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import classNames from 'classnames';
import arrow from '/public/icons/menuArrow.svg';
import { useUserInfoStore } from '../store/store';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo, setUserInfo, clearUserInfo } = useUserInfoStore();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        if (token === null) return;

        const response = await axios.get(
          `http://localhost:10010/mypages/${token.user_pk}`,
          {
            headers: {
              Authorization: token.accessToken,
            },
          }
        );

        setUserInfo(response.data);
        console.log('유저 정보:', response.data);
        console.log(userInfo);
        setIsMenuOpen((prevState) => !prevState);
      } catch (error: unknown) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

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
          <li className="py-1">
            {userInfo?.id ? (
              <Link href={`/mypage/${userInfo.id}`} className="flexBetween">
                <div>마이페이지</div>
                <Image src={arrow} alt="" aria-hidden />
              </Link>
            ) : (
              <Link href="/login" onClick={toggleMenu} className="flexBetween">
                <div>로그인</div>
                <Image src={arrow} alt="" aria-hidden />
              </Link>
            )}
          </li>
          <li className="py-1">
            {userInfo?.nickname ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flexBetween"
              >
                <div>로그아웃</div>
                <Image src={arrow} alt="" aria-hidden />
              </button>
            ) : (
              <Link href="/signup" onClick={toggleMenu} className="flexBetween">
                <div>회원가입</div>
                <Image src={arrow} alt="" aria-hidden />
              </Link>
            )}
          </li>
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
