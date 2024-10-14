"use client";

import { useState } from "react";
import axios from "axios";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:10010/users/login", {
        email: loginData.email,
        pwd: loginData.password,
      });

      console.log("로그인 성공 :", response.data);
      alert("로그인 성공!");

      localStorage.setItem("token", JSON.stringify(response.data.token));
      window.location.href = "/";
    } catch (error: any) {
      if (!error.response) {
        console.error("요청 중 오류 :", error);
        setErrors("요청 중 문제가 발생했습니다. 나중에 다시 시도해주세요.");
        return;
      }
      const { status, data } = error.response;

      if (status === 400) {
        setErrors("아이디 또는 비밀번호가 잘못되었습니다.");
        return; // 인증 오류 처리 후 종료
      }
      // 기타 에러 처리
      setErrors("로그인에 실패했습니다: " + data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-white">로그인</h2>
      </div>

      <form className="w-full bg-transparent" onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-white mb-1">
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

        <div className="mb-10">
          <label htmlFor="password" className="block text-sm text-white mb-1">
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
        {errors && <p className="text-red-500 mb-4">{errors}</p>}

        <div className="mt-6 mb-4">
          <button
            type="submit"
            className="w-full py-3  text-white font-semibold bg-[#FF6347] rounded-sm"
          >
            로그인
          </button>
        </div>

        <div className="text-center">
          <a href="/signup" className="text-sm text-gray-200 hover:underline">
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}
