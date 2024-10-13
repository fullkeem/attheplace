export default function Signup() {
  return (
    <form className="mt-4 w-full p-8">
      <fieldset className="flex flex-col gap-6 border-none">
        <legend className="text-lg font-bold text-white mb-8 text-center">
          회원가입
        </legend>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-white">
            아이디 (이메일 주소):
          </label>
          <input
            type="email"
            id="email"
            className="inputCommon"
            placeholder="예: sample@domain.com"
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-white">
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            className="inputCommon"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm text-white">
            비밀번호 확인:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="inputCommon"
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col">
          <label htmlFor="nickname" className="text-sm text-white">
            닉네임:
          </label>
          <input
            type="text"
            id="nickname"
            className="inputCommon"
            placeholder="닉네임을 입력하세요"
            required
          />
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-10 w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900"
      >
        가입하기
      </button>
    </form>
  );
}
