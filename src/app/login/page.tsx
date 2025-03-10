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
      onSuccess: () => {
        router.push('/');
      },
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
      <div className="flexCenter mt-10 h-500pxr w-300pxr flex-col rounded-xl bg-bgColor/75 p-10 desktop:mt-16 desktop:h-600pxr desktop:w-500pxr">
        <div className="mb-8 text-center">
          <h2 className="text-lg font-semibold text-white desktop:text-3xl">
            로그인
          </h2>
        </div>

        <form className="w-full bg-transparent" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm text-white desktop:text-lg"
            >
              아이디
            </label>
            <input
              type="email"
              id="email"
              value={loginData.email}
              onChange={handleChange}
              className="inputCommon"
              placeholder="아이디(이메일) 입력"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-white desktop:text-lg"
            >
              비밀번호 입력
            </label>
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
              autoComplete="off"
              className="inputCommon"
              placeholder="비밀번호 입력"
              required
            />
          </div>
          {/* 에러 메시지 출력 */}
          {errorMessage && (
            <p className="mb-4 text-sm text-red-500 desktop:text-lg">
              {errorMessage}
            </p>
          )}
          <div className="mb-4 mt-6 desktop:mt-8 desktop:text-lg">
            <button
              type="submit"
              className="w-full rounded-sm bg-buttonColor py-3 font-semibold text-white"
            >
              로그인
            </button>
          </div>
          <div className="my-2">
            <KakaoLogin />
          </div>
          <div className="text-center desktop:mt-4">
            <Link
              href="/signup"
              className="text-sm text-gray-200 underline underline-offset-2 desktop:text-lg"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
