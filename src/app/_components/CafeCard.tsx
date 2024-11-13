import Image from 'next/image';
import Link from 'next/link';
import React, { forwardRef } from 'react';
import { Cafe } from '../store/cafeStore';

interface CafeCardProps {
  cafe: Cafe;
}

const CafeCard = forwardRef<HTMLLIElement, CafeCardProps>(({ cafe }, ref) => {
  return (
    <li
      key={cafe.id}
      ref={ref}
      className="h-32 min-w-220pxr flex-none rounded-lg bg-white hover:shadow-lg"
    >
      <Link
        href={`/detail/${cafe.id}`}
        className="flex cursor-pointer flex-row gap-2 p-4 transition-shadow"
      >
        <div className="flex max-w-40 flex-grow flex-col gap-3pxr">
          <h3 className="text-md font-bold text-gray-500">{cafe.cafe_name}</h3>
          <p className="text-sm text-gray-500">{cafe.opening_hours}</p>
          <p className="text-sm text-gray-500">{cafe.contact_number}</p>
          <p className="truncate text-sm text-gray-500">
            {cafe.location_address}
          </p>
        </div>
        <div className="relative h-24 w-24">
          <Image
            src={cafe.image_main}
            alt={`${cafe.cafe_name} 이미지`}
            fill
            className="block rounded-md object-cover"
          />
        </div>
      </Link>
    </li>
  );
});

CafeCard.displayName = 'CafeCard'; // forwardRef 사용 시 컴포넌트 이름을 지정해주는 것이 좋습니다.

export default CafeCard;
