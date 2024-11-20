// src/hooks/useMap.ts
import { useEffect } from 'react';
import { Cafe } from '../store/cafeStore';

interface UseMapProps {
  mapRef: React.MutableRefObject<naver.maps.Map | null>;
  cafes: Cafe[];
  onMarkerClick: (cafe: Cafe) => void;
}

export const useMap = ({ mapRef, cafes, onMarkerClick }: UseMapProps) => {
  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5513332, 126.9133705),
        zoom: 14,
      };
      const map = new naver.maps.Map('map', mapOptions);
      mapRef.current = map;
      addCafeMarkers(map);
    };

    const addCafeMarkers = (map: naver.maps.Map) => {
      cafes.forEach((cafe) => {
        const cafeLocation = new naver.maps.LatLng(
          cafe.latitude,
          cafe.longitude
        );
        const marker = new naver.maps.Marker({
          position: cafeLocation,
          map: map,
          title: cafe.cafe_name,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `<div style="padding:10px;max-width:200px;">
            <h3 style="color: black; font-size: 12px;">${cafe.cafe_name}</h3>
          </div>`,
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
          onMarkerClick(cafe);
        });
      });
    };

    // 네이버 지도 API 로드
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_ID_KEY}`;
      document.head.appendChild(mapScript);
    }
  }, [cafes, mapRef, onMarkerClick]);
};
