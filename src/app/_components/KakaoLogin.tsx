import Image from 'next/image';

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      {/* 카카오 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#FEE500] py-3 font-semibold text-black"
      >
        <Image
          src="/icons/KakaoTalk_logo.png"
          alt="카카오 로그인"
          width={24}
          height={24}
        />
        카카오로 로그인
      </button>
    </div>
  );
}
