import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/icons/menuArrow.svg';

interface MenuItemProps {
  label: string;
  href?: string;
  hideArrow?: boolean;
  onClick?: () => void;
}

export default function MenuItem({
  label,
  href,
  hideArrow = true,
  onClick,
}: MenuItemProps) {
  const hideArrowClass = hideArrow ? 'desktop:hidden' : '';
  return (
    <li className="py-1">
      {href ? (
        // 링크 형태
        <Link href={href} onClick={onClick} className="flexBetween">
          <div>{label}</div>
          <Image src={arrow} alt="" aria-hidden className={hideArrowClass} />
        </Link>
      ) : (
        // 버튼 형태
        <button type="button" onClick={onClick} className="flexBetween w-full">
          <div>{label}</div>
          <Image src={arrow} alt="" aria-hidden className={hideArrowClass} />
        </button>
      )}
    </li>
  );
}
