export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      {/* 헤더: 로그인 메시지 */}
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-white">로그인</h2>
      </div>

      {/* 로그인 폼 */}
      <form className="w-full bg-transparent">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-white mb-1">
            아이디
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-b border-gray-200 bg-transparent focus:border-gray-600 focus:outline-none py-2"
            placeholder="이메일 아이디"
            required
          />
        </div>

        <div className="mb-10">
          <label htmlFor="password" className="block text-sm text-white mb-1">
            비밀번호 입력
          </label>
          <input
            type="password"
            id="password"
            className="w-full border-b border-gray-200 bg-transparent focus:border-gray-600 focus:outline-none py-2"
            placeholder="비밀번호 입력"
            required
          />
        </div>

        {/* 로그인 버튼 */}
        <div className="mt-6 mb-4">
          <button
            type="submit"
            className="w-full py-3  text-white font-semibold bg-[#FF6347] rounded-sm"
          >
            로그인
          </button>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center">
          <a href="/signup" className="text-sm text-gray-200 hover:underline">
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}
