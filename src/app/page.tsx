'use client';

import React, { useRef } from "react";
import { useAtom } from "jotai";
import { isLoginAtom } from "@/atoms/IsLoginAtom";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loginstate] = useAtom(isLoginAtom);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 sm:px-8 space-y-16">
      {/* ✅ 타이틀 영역 (항상 노출) */}
      <section className="text-center space-y-4 pt-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          부산 폐기물 자동 분류 서비스
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          폐기물 이미지를 업로드하면 종류를 자동으로 분류하고, <br />
          지자체 신고 및 결제까지 간편하게 연결됩니다.
        </p>
      </section>

      {loginstate.isLogin === 'logged-in' && (
        <section className="w-1/2 flext flex-colmax-w-xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100 dark:border-gray-700">
          {/* 업로드 영역 */}
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              이미지 업로드
            </h2>
            <form
              action="/"
              method="post"
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
              />
              <button
                onClick={onButtonClick}
                className="w-full sm:w-auto bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium px-4 py-2 rounded-lg transition"
              >
                사진 선택
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
              >
                업로드
              </button>
            </form>
          </div>

          {/* 로그인 상태 정보 */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm space-y-2">
            <p><span className="font-semibold">닉네임:</span> {loginstate.nickname}</p>
            <p><span className="font-semibold">로그인 타입:</span> {loginstate.logintype}</p>
            <p><span className="font-semibold">권한:</span> {loginstate.role}</p>
            <p><span className="font-semibold">아이디:</span> {loginstate.username}</p>
            <p><span className="font-semibold">상태:</span> 로그인됨</p>
          </div>
        </section>
      )}
    </div>
  );
}
