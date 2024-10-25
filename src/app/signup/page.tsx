'use client';

import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  validateEmailForm,
  validatePasswordForm,
  checkConfirmPassword,
} from '../utils/validators';
import SignupFormField from '../_components/SignupFormField';
import { handleError, SignupError } from '../utils/errorHandler';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  profileImage: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    profileImage: faker.image.avatar(),
  });

  const [errors, setErrors] = useState<SignupError>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  // 입력값 저장
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // API 요청 처리
  const sendSignupRequest = async (formData: SignupFormData) => {
    return await axios.post('http://localhost:10010/member/join', {
      email: formData.email,
      nickname: formData.nickname,
      password: formData.password,
      profile_image: formData.profileImage,
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

      try {
        const response = await sendSignupRequest(formData);
        if (response) {
          console.log('회원가입 성공:', response.data);
          alert('회원가입이 완료되었습니다.');
          window.location.href = '/';
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          handleError(message, setErrors);
        }
      }
    }
  };

  return (
    <form
      className="mt-10 w-full rounded-xl bg-[#353434]/70 p-8"
      onSubmit={handleSubmit}
    >
      <fieldset className="flex flex-col gap-6 border-none">
        <legend className="mb-8 w-full text-center text-lg font-bold text-white">
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
  );
}
