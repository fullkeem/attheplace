'use client';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import arrow from '/public/icons/menuArrow.svg';

interface UserInfo {
  email: string;
  nickName: string;
}

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 메뉴 상태 토글
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // 메뉴가 열리고 닫히는 설정
  const menuClasses = classNames(
    "fixed top-0 right-0 w-full h-full z-20 transform transition-transform duration-300 bg-[url('/images/blackBg.webp')] bg-cover bg-center",
    {
      'translate-x-0': isMenuOpen,
      'translate-x-full': !isMenuOpen,
    }
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // localStorage에서 저장된 토큰을 가져오기
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        // 토큰이 없으면 함수 실행 중지
        if (!token || !token.accessToken) {
          console.log('no token');
          return;
        }
        console.log(token.accessToken);

        // 서버로 사용자 정보 요청
        const response = await axios.get(
          `http://localhost:10010/mypages/${token.user_pk}`,
          {
            headers: {
              Authorization: token.accessToken,
            },
          }
        );

        // 받아온 사용자 정보 저장
        setUserInfo(response.data);

        console.log('유저 정보:', response.data);
      } catch (error: unknown) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

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
            <Link href="/login" onClick={toggleMenu} className="flexBetween">
              <div>로그인</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
          </li>
          <li className="py-1">
            <Link href="/signup" onClick={toggleMenu} className="flexBetween">
              <div>회원가입</div>
              <Image src={arrow} alt="" aria-hidden />
            </Link>
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

      {/* 메뉴가 열릴 때 어두운 배경 추가 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}
