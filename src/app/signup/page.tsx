'use client';

import Image from 'next/image';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/navigation';
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
          router.push('/');
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data;
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
        className="mt-10 h-[550px] w-[300px] rounded-xl bg-[#353434]/70 p-10"
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
