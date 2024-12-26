'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { useLoginMutation } from '../hooks/useAuthQuery';
import KakaoLogin from '../_components/KakaoLogin';

export default function Login() {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const { loginData, setLoginData } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'email' || id === 'password') {
      setLoginData(id as keyof LoginForm, value);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData, {
      onSuccess: () => router.push('/'),
      onError: () => {
        setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
      },
    });
  };

  return (
    <div className="bgBox">
      <Image
        src={'/images/background/login_bg.webp'}
        className="bgImage"
        alt=""
        fill
        priority
        aria-hidden="true"
      />
      <div className="mt-10 flex h-500pxr w-300pxr flex-col rounded-xl bg-[#353434]/75 p-10">
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
              placeholder="아이디(이메일) 입력"
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
          {errorMessage && (
            <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
          )}
          <div className="mb-4 mt-6">
            <button
              type="submit"
              className="w-full rounded-sm bg-[#FF6347] py-3 font-semibold text-white"
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>
          </div>
          <div className="my-2">
            <KakaoLogin />
          </div>
          <div className="text-center">
            <Link
              href="/signup"
              className="text-sm text-gray-200 underline underline-offset-2"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
