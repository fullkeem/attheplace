# At The Place

![스크린샷 2025-03-04 164042](https://github.com/user-attachments/assets/da593442-7426-46aa-87ce-783cb6e47c8a)

- 배포 URL: https://attheplace.vercel.app/
- test ID: test@gmail.com
- test PW : test1234!

  <br />

## ☝️프로젝트 소개
  - 간단 소개: 사용자의 취향을 설문의 답변을 토대로 종합해서 맞춤형 카페를 찾아주는 서비스입니다.
  - 기간: 2024.10 ~ 2024.11
  - 참여 인원: 프론트엔드 1 + 백엔드 1

<br />

## ✨주요 기능
- 로그인/회원가입
  - JWT 기반 인증, Kakao 소셜 로그인 지원
- 취향 찾기
  - 단계별 질문의 답변을 통해 조건에 부합한 카페 필터링 후 지도 페이지로 이동/표시
- 지도(Map) & 카드 리스트 
  - 네이버 지도 사용
  - 지도에 표시된 마커와 하단 카드 목록 연동
  - 내 위치 표시
- 마이 페이지
  - 프로필 사진(변경 가능)
  - 찜 목록(좋아요 등록/해제)
- 카페 상세
  - 카페 이미지들 캐러셀
  - 좋아요, 지도(StaticMap), 상세 정보 표시

 <br />

 ## 🛠️기술 스택
 | 분류 | 스택 |
 |:---|:---|
 |Framework|	Next.js |
 |Language|	TypeScript|
 |State/Query|	Zustand + React Query|
 |Styling|	Tailwind CSS|
 |Map API|	Naver Map|
 |Carousel| SwiperJS |
 |Auth|	JWT (LocalStorage) & Kakao OAuth|
 |Deployment	|Vercel|

<br />

## 🌳폴더 구조
```
├─ app/
|  ├─ components/       # 재사용 가능한 컴포넌트
|  ├─ api/              # 백엔드 API 통신 
│  ├─ page.tsx          # Home 페이지
│  ├─ login/            # 로그인 페이지
│  ├─ signup/           # 회원가입 페이지
│  ├─ mypage/           # 마이페이지
│  ├─ map/              # 지도 페이지
│  ├─ detail/           # 카페 상세 페이지
|  ├─ store/            # Zustand store, global state
|  ├─ utils/            # 유틸 함수 (폼 검증, etc)
│  └─ hooks/            # React Query custom hooks 등
├─ public/
│  ├─ icons/            # 아이콘 SVG/PNG
│  └─ images/           # 배경/샘플 이미지
├─ .env
├─ tailwind.config.js
├─ tsconfig.json
├─ package.json
└─ README.md
```

<br />

## 📝페이지 소개

### 로그인/회원가입

| 로그인 | 회원가입 |
|:---:|:---:|
| ![로그인](https://github.com/user-attachments/assets/6d309f49-725b-41a0-ae10-8b933873c1d4) | ![회원가입](https://github.com/user-attachments/assets/5bf5cd51-f0ca-4b1f-b94d-c8e27377be91) |

#### 로그인
- JWT 인증, Kakao 소셜 로그인
#### 회원가입
- 폼 검증(이메일/비밀번호 정규식), 에러 핸들링

<br />

### 마이페이지/ 카페 상세

| 마이페이지 | 카페 상세 |
|:---:|:---:|
| ![마이페이지](https://github.com/user-attachments/assets/0f10d893-8354-4786-a2fe-32a78433f719) | ![카페 상세](https://github.com/user-attachments/assets/055a88a8-a11a-43c4-83d7-bc5aa4f48eb8) |

#### 마이페이지
- 프로필 사진 변경 (모달에서 이미지 미리보기 + 업로드)
- 찜 목록(좋아요 등록/해제) 확인

#### 카페 상세
- 대표 사진/메뉴 사진을 캐러셀(Swiper Coverflow)로 확인
- 좋아요(찜), 정적 지도, 카페 상세 정보 표시
  
<br />

### 취향 찾기 / 지도

| 취향 찾기 | 지도 |
|:---:|:---:|
| ![취향 찾기](https://github.com/user-attachments/assets/12c454b6-562e-44a0-ab51-4f01fdf1dca6)| ![지도](https://github.com/user-attachments/assets/d96dd35a-b6a5-4c13-bc03-77129196147b) |

#### 취향 찾기
- 4개의 질문(반려동물, 단체석, 테라스, 디카페인)에 Yes/No로 답변-> 적합한 카페 필터링 후 지도 페이지로 이동
- 상단에 단계별 progressbar 표시 

#### 지도
- 필터링된 카페들의 위치를 마커로 표시(취향 찾기 없이 지도로 이동 시 전체 카페 마커 표시)
- 하단에 필터링 된 카페 요약 정보 카드 리스트 표시
- "내 위치" 버튼으로 내 위치 찾기

<br />

