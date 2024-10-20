'use client';

import { useState } from 'react';
import axios from 'axios';
import { validateEmail, validatePassword } from '../utils/util';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  profileImage: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickName: '',
    profileImage: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickName: '',
  });

  // 이메일 유효성 검사
  const validateEmailForm = () => {
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: '유효하지 않은 이메일 형식입니다.',
      }));
      isValid = false;
    }
    return isValid;
  };

  // 비밀번호 유효성 검사
  const validatePasswordForm = () => {
    let isvalid = true;

    if (!validatePassword(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        password: '비밀번호는 최소 8자, 숫자 및 특수 문자를 포함해야 합니다.',
      }));
      isvalid = false;
    }
    return isvalid;
  };

  // 비밀번호 확인
  const checkConfirmPassword = () => {
    let isValid = true;
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
      isValid = false;
    }

    return isValid;
  };

  // 입력값 저장
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // API 요청 처리
  const sendSignupRequest = async (formData: SignupFormData) => {
    return await axios.post('http://localhost:10010/users/signup', {
      email: formData.email,
      pwd: formData.password,
      nickName: formData.nickName,
      profileImage: formData.profileImage,
    });
  };

  // 에러 처리
  const handleError = (error: any) => {
    if (error?.response) {
      const { status, data } = error?.response;
      const errorMessages: { [key: string]: string } = {
        email: '이미 사용 중인 이메일입니다.',
        nickName: '이미 사용 중인 닉네임입니다.',
      };

      const matchedError = Object.keys(errorMessages).find((key) =>
        data.message.includes(key)
      );

      if (status === 400 && matchedError) {
        setErrors((prev) => ({
          ...prev,
          [matchedError]: errorMessages[matchedError],
        }));
      } else {
        alert('회원가입에 실패했습니다: ' + data.message);
      }
    } else {
      console.error('요청 중 오류:', error);
      alert('요청 중 문제가 발생했습니다.');
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사 통과 여부 확인
    if (
      !validateEmailForm() &&
      !validatePasswordForm() &&
      !checkConfirmPassword()
    ) {
      return; // 유효성 검사 실패하면 서버 요청 x
    }

    // 초기화
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      nickName: '',
    });

    try {
      const response = await sendSignupRequest(formData);
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');
      window.location.href = '/';
    } catch (error: unknown) {
      handleError(error);
    }
  };

  return (
    <form
      className="mt-10 w-full rounded-xl bg-[#353434]/70 p-8"
      onSubmit={handleSubmit}
    >
      <fieldset className="flex flex-col gap-6 border-none">
        <legend className="mb-8 text-center text-lg font-bold text-white">
          회원가입
        </legend>

        {/* 아이디 */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-white">
            아이디 (이메일 주소):
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            className="inputCommon"
            placeholder="예: sample@domain.com"
            onChange={handleDataChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-white">
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            className="inputCommon"
            placeholder="비밀번호를 입력하세요"
            onChange={handleDataChange}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm text-white">
            비밀번호 확인:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            className="inputCommon"
            placeholder="비밀번호를 다시 입력하세요"
            onChange={handleDataChange}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col">
          <label htmlFor="nickname" className="text-sm text-white">
            닉네임:
          </label>
          <input
            type="text"
            id="nickName"
            value={formData.nickName}
            className="inputCommon"
            placeholder="닉네임을 입력하세요"
            onChange={handleDataChange}
            required
          />
          {errors.nickName && <p className="text-red-500">{errors.nickName}</p>}
        </div>
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
