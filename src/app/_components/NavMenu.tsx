"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import classNames from "classnames";

export default function Menu() {
  // TypeScript에서 boolean 타입으로 상태 선언
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 상태 토글 함수
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // 메뉴가 열리고 닫히는 클래스 설정
  const menuClasses = classNames(
    "fixed top-0 right-0 w-64 h-full z-20 transform transition-transform duration-300 bg-[url('/images/attheplaceBg.webp')] bg-cover bg-center",
    {
      "translate-x-0": isMenuOpen,
      "translate-x-full": !isMenuOpen,
    }
  );

  return (
    <>
      <button onClick={toggleMenu} className="absolute right-5 cursor-pointer">
        <Image src="/icons/menuIcon.svg" alt="메뉴" width={25} height={25} />
      </button>

      {/* 네비게이션 메뉴 */}
      <nav className={menuClasses}>
        <button className="absolute top-4 right-4" onClick={toggleMenu}>
          X
        </button>
        <ul className="mt-6 flex flex-col p-6 gap-7">
          <li className="py-1 border-b">
            <Link href="/login" onClick={toggleMenu}>
              로그인
            </Link>
          </li>
          <li className="py-1 border-b">
            <Link href="/signup" onClick={toggleMenu}>
              회원가입
            </Link>
          </li>
          <li className="py-1 border-b">
            <Link href="/findingCafe" onClick={toggleMenu}>
              Test
            </Link>
          </li>
          <li className="py-1 border-b">
            <Link href="/map" onClick={toggleMenu}>
              Map
            </Link>
          </li>
        </ul>
      </nav>

      {/* 메뉴가 열릴 때 어두운 배경 추가 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}
