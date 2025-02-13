import Image from 'next/image';

interface StaticMapProps {
  latitude: number;
  longitude: number;
}

export default function StaticMap({ latitude, longitude }: StaticMapProps) {
  const mapUrl = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?&center=${longitude},${latitude}&level=15&w=300&h=200&format=png&markers=type:d|size:small|pos:${longitude} ${latitude}&X-NCP-APIGW-API-KEY-ID=${process.env.NEXT_PUBLIC_NAVER_ID_KEY}&X-NCP-APIGW-API-KEY=${process.env.NEXT_PUBLIC_NAVER_MAP_KEY}`;

  return (
    <div className="flexCenter mt-5 h-full w-2/3">
      <Image
        src={mapUrl}
        width={180}
        height={220}
        alt="static map"
        className="h-full w-full rounded-md"
      />
    </div>
  );
}
