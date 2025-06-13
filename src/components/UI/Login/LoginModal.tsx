"use client";

import { useState } from "react";
import Resister from "../Register/Register";
import DefalutLogin from "./DefalutLogin";
import Button01 from "@/components/etc/Button01";
import SocialLogin from "./SocialLogin";

export default function LoginModal({ onclose }: { onclose: () => void }) {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-[360px] max-w-full p-6 shadow-lg flex flex-col">
        {/* 탭 버튼 */}
        <div className="flex gap-3 mb-4">
          <Button01
            caption="로그인"
            bg_color={formType === "login" ? "blue" : "lime"}
            onClick={() => setFormType("login")}
          />
          <Button01
            caption="회원가입"
            bg_color={formType === "register" ? "blue" : "lime"}
            onClick={() => setFormType("register")}
          />
        </div>

        {/* 구분선 */}
        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        {/* 폼 */}
        <div className="mt-6 flex-grow">
          {formType === "login" ? (
            <DefalutLogin onclose={onclose} />
          ) : (
            <Resister onclose={onclose} />
          )}
        </div>

        {/* 소셜 로그인 */}
        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-center">
          소셜 로그인
        </p>
        <SocialLogin />

        {/* 닫기 버튼 */}
        <button
          onClick={onclose}
          className="mt-6 self-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition"
          aria-label="닫기"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
