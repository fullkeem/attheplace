import Image from 'next/image';

export default function CafeInfo() {
  return (
    <div className="flexBetween p-2">
      <div className="flex flex-col gap-1 text-sm">
        <h3 className="font-bold">포트레이트커피바</h3>
        <div className="flex gap-[1px] text-[12px]">
          <span>12:00-20:00</span>
          <span>ㅣ</span>
          <span>0507-332-3332</span>
        </div>
        <div className="text-[12px]">서울 마포구 포은로8길 32</div>
      </div>
      <div>
        <Image
          src={'/images/blackBg.webp'}
          alt=""
          className="rounded-md"
          width={80}
          height={70}
        />
      </div>
    </div>
  );
}
