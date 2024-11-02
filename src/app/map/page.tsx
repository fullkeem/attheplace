'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import cafeList from '../mock/cafe.json';
import CafeCard from '../_components/CafeCard';

export default function Map() {
  const mapRef = useRef<null | naver.maps.Map>(null);

  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new naver.maps.Map('map', mapOptions);

      cafeList.cafeList.forEach((cafe) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(cafe.위도, cafe.경도),
          map: map,
          title: cafe.name,
        });
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          new naver.maps.Marker({
            position: currentLocation,
            map: map,
            title: 'My Location',
          });
          map.setCenter(currentLocation);
        });
      }
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_ID_KEY}`;
      document.head.appendChild(mapScript);
    }
  }, []);

  // 현재 위치로 지도 중심 이동
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        if (mapRef.current) {
          mapRef.current.setCenter(currentLocation);
        }
      });
    }
  };

  return (
    <div className="flexCenter relative h-full w-full">
      <div id="map" className="h-full w-full"></div>
      <button
        onClick={handleCurrentLocationClick}
        className="absolute left-5 top-5 rounded border-gray-300 bg-gray-300 p-2"
      >
        <Image
          src={'/icons/myLocation.svg'}
          alt="내 위치 찾기"
          width={25}
          height={25}
        />
      </button>
      <div className="absolute bottom-20 w-full bg-white">
        <CafeCard />
      </div>
    </div>
  );
}
