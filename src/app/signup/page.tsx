'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/navigation';
import { useModalStore } from '../store/modalStore';
import { useSignupMutation } from '../hooks/useAuthQuery';
import SignupFormField from '../_components/SignupFormField';
import { handleError, SignupError } from '../utils/errorHandler';
import {
  validateEmailForm,
  validatePasswordForm,
  checkConfirmPassword,
} from '../utils/validators';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  profile_image: string;
}

export default function Signup() {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    profile_image: faker.image.avatar(),
  });

  const [errors, setErrors] = useState<SignupError>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const { mutate: signupMutate } = useSignupMutation();

  // 회원가입 성공 시 모달창
  const openSignupModal = () => {
    openModal(
      <div className="p-5">
        <p className="text-center font-semibold text-black">
          At the Place의 회원이 되신 걸 <br />
          환영합니다!
        </p>
        <div className="flexBetween mt-6">
          <button
            onClick={() => {
              closeModal();
              router.push('/login'); // 로그인 페이지로 이동
            }}
            className="w-full rounded bg-[#FF6347] px-4 py-2 text-white"
          >
            확인
          </button>
        </div>
      </div>
    );
  };

  // 입력값 저장
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const isEmailValid = validateEmailForm(formData.email, setErrors);
    const isPasswordValid = validatePasswordForm(formData.password, setErrors);
    const isPasswordConfirmValid = checkConfirmPassword(
      formData.password,
      formData.confirmPassword,
      setErrors
    );

    if (isEmailValid && isPasswordValid && isPasswordConfirmValid) {
      // 초기화
      setErrors({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
      });

      signupMutate(formData, {
        onSuccess: () => {
          openSignupModal();
        },
        onError: (error: AxiosError) => {
          const errorMessage =
            typeof error.response?.data === 'string'
              ? error.response.data
              : 'Unknown error';
          handleError(errorMessage, setErrors);
        },
      });
    }
  };

  return (
    <div className="bgBox">
      <Image
        src={'/images/background/signup_bg.webp'}
        className="bgImage"
        alt=""
        fill
        priority
        aria-hidden="true"
      />
      <form
        className="h-550pxr w-300pxr mt-10 rounded-xl bg-[#353434]/70 p-10"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col gap-6 border-none">
          <legend className="mb-10 w-full text-center text-lg font-bold text-white">
            회원가입
          </legend>

          <SignupFormField
            formData={formData}
            errors={errors}
            handleDataChange={handleDataChange}
          />
        </fieldset>

        <button
          type="submit"
          className="mt-10 w-full rounded-lg bg-[#FF6347] py-3 text-white"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
