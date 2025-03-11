# At The Place
 ![스크린샷 2025-02-20 141552](https://github.com/user-attachments/assets/fb579a8f-2f69-4367-b586-17000151e5ba)
 
 - 배포 URL : https://attheplace.vercel.app
 - Test ID : test@gmail.com
 - Test PW : test1234!
 
 <br />
 
 ## ☝️소개
 - 사옹자의 취향을 조사해 맞춤형 카페를 찾아주는 서비스입니다.
 - 4가지 질문의 답변을 통해 사용자가 찾는 카페를 찾아드립니다.
 - 마음에 드는 카페가 있다면 찜 목록에 넣을 수 있습니다.

<br />

## 📝기술 스택

|분류 |	스택 |
 |:---|:----|
 | Framework |	Next.js 14 (App Router) |
 |Language|	TypeScript|
 |State/Query|	Zustand + React Query|
 |Styling|	Tailwind CSS|
 |Map API|	Naver Map|
 |Auth|	JWT (LocalStorage) & Kakao OAuth|
 |Carousel| SwiperJS|
 |Deployment	|Vercel|
 
 ## 🌳 폴더 구조
 ```
 ├─ app/
 |  ├─ components/       # 재사용 가능한 컴포넌트
 |  ├─ api/              # 백엔드 API 통신 함수
 │  ├─ page.tsx          # Home 페이지
 │  ├─ login/            # 로그인 페이지
 │  ├─ signup/           # 회원가입 페이지
 │  ├─ mypage/           # 마이페이지
 │  ├─ map/              # 지도 페이지
 │  ├─ detail/           # 카페 상세 페이지
 |  ├─ utils/            # 유틸 함수 (폼 검증, etc)
 |  ├─ store/            # Zustand store, global state
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

## 👀주요 페이지 소개

### 로그인 & 회원가입
 |로그인 | 회원가입|
 |:----:|:----:|
 |![로그인](https://github.com/user-attachments/assets/c8e438c0-0368-40af-a051-ec9f5152fa9b)|![회원가입](https://github.com/user-attachments/assets/2d9a330c-b566-452f-9a00-c5c9cb7e7c1e)|
 - JWT 기반 인증, Kakao 소셜 로그인 지원
 - 폼 검증(이메일/비밀번호 정규식), 에러 핸들링

<br/>

### 마이 페이지 & 상세 페이지
 |마이페이지|상세 페이지|
 |:---:|:---:|
 |![마이페이지](https://github.com/user-attachments/assets/08536d66-10a5-45cd-a965-720bdc5ce465)|![카페 상세](https://github.com/user-attachments/assets/8e860658-1a11-432d-89e1-7e6183c0f874)|
 #### 마이페이지
 - 프로필 사진 변경 (모달에서 이미지 미리보기 + 업로드)
 - 찜 목록(좋아요 등록/해제) 확인
 #### 카페 상세
 - 대표 사진/메뉴 사진을 캐러셀(Swiper Coverflow)로 확인
 - 좋아요(찜) 버튼, 지도(StaticMap), 상세 정보 표시

<br />

### 지도 & 취향 찾기
 |지도|취향 찾기|
 |:---:|:---:|
 |![취향찾기](https://github.com/user-attachments/assets/ed812879-8fb1-4e7a-b20f-39e8857b2947)|![지도](https://github.com/user-attachments/assets/bfa0435e-868c-46e4-bc98-95ac86b121a0)|
 #### 취향 찾기
 - 단계별 질문(반려동물, 단체석, 테라스, 디카페인)에 Yes/No로 답변 → 적합한 카페 필터링 후 지도 페이지로 이동
 #### 지도(Map)
 - 필터링된 카페들의 위치를 네이버 지도에 마커로 표시 (취향 찾기 단계 없이 map 페이지로 이동 시 모든 카페 표시) 
 - 마커 클릭 시 하단 카드가 스크롤되고, 카드 클릭 시 상세 페이지로 이동
