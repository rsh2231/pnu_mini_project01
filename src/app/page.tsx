"use client";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center px-4 sm:px-6 md:px-8 py-12 space-y-16">
      
      {/* 타이틀 영역 */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-lg">
          ♻ 부산 폐기물 자동 분류 시스템
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          폐기물 이미지를 업로드하면 종류를 자동 분류하고, <br />
          지자체 신고와 결제를 간편하게 처리합니다.
        </p>
      </section>

      {/* 로그인 시 업로드 영역 */}
      {loginstate.isLogin === 'logged-in' && (
        <section className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 backdrop-blur-md">
          
          {/* 이미지 업로드 */}
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              📷 이미지 업로드
            </h2>

            <form
              action="/"
              method="post"
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept="image/*"
                capture="environment"
                className="hidden"
              />

              <button
                onClick={onButtonClick}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-xl transition shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                사진 선택
              </button>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-xl transition shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                업로드
              </button>
            </form>
          </div>

          {/* 로그인 상태 정보 */}
          <div className="bg-gray-700 p-5 sm:p-6 rounded-2xl text-sm space-y-2 shadow-inner">
            <h3 className="text-base sm:text-lg font-bold mb-2">🔐 로그인 정보</h3>
            <div className="space-y-1">
              <p><span className="font-semibold text-gray-300">닉네임:</span> {loginstate.nickname}</p>
              <p><span className="font-semibold text-gray-300">로그인 타입:</span> {loginstate.logintype}</p>
              <p><span className="font-semibold text-gray-300">권한:</span> {loginstate.role}</p>
              <p><span className="font-semibold text-gray-300">아이디:</span> {loginstate.username}</p>
              <p><span className="font-semibold text-gray-300">상태:</span> 로그인됨</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
