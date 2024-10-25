'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:10010/users/login', {
        email: loginData.email,
        pwd: loginData.password,
      });

      console.log('로그인 성공 :', response.data);
      alert('로그인 성공!');

      localStorage.setItem('token', JSON.stringify(response.data.token));

      window.location.href = '/';
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          console.error('요청 중 오류 :', error);
          setErrors('요청 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
          return;
        }
        const { status, data } = error.response;

        if (status === 400) {
          setErrors('아이디 또는 비밀번호가 잘못되었습니다.');
          return; // 인증 오류 처리 후 종료
        }
        // 기타 에러 처리
        setErrors('로그인에 실패했습니다: ' + data.message);
      }
    }
  };

  return (
    <div className="items-centerm mt-10 flex flex-col justify-center rounded-xl bg-[#353434]/75 p-10">
      <div className="mb-8 text-center">
        <h2 className="text-lg font-semibold text-white">로그인</h2>
      </div>

      <form className="w-full bg-transparent" onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm text-white">
            아이디
          </label>
          <input
            type="email"
            id="email"
            value={loginData.email}
            onChange={handleChange}
            className="inputCommon w-full"
            placeholder="이메일 아이디"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-1 block text-sm text-white">
            비밀번호 입력
          </label>
          <input
            type="password"
            id="password"
            value={loginData.password}
            onChange={handleChange}
            className="inputCommon w-full"
            placeholder="비밀번호 입력"
            required
          />
        </div>

        {/* 에러 메시지 출력 */}
        {errors && <p className="mb-4 text-red-500">{errors}</p>}

        <div className="mb-4 mt-6">
          <button
            type="submit"
            className="w-full rounded-sm bg-[#FF6347] py-3 font-semibold text-white"
          >
            로그인
          </button>
        </div>

        <div className="text-center">
          <a
            href="/signup"
            className="text-sm text-gray-200 underline underline-offset-2"
          >
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}
