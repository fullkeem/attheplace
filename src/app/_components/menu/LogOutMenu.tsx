import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/icons/menuArrow.svg';

export default function LogOutMenu({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <>
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
    </>
  );
}
