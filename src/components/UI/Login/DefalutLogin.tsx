"use client";
import { isLoginAtom } from "@/atoms/IsLoginAtom";
import { Logininfo } from "@/type/logininfo";
import axios from "axios";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

export default function DefalutLogin({ onclose }: { onclose: () => void }) {
  const { register, handleSubmit } = useForm();
  const [, setLoginSate] = useAtom<Logininfo>(isLoginAtom);

  // 로그인 프로세스
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "api/login",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLoginSate({ isLogin: "logged-in" });
        alert("로그인 성공");
        onclose();
        window.location.href = "/";
      }
    } catch (error: any) {
      console.log(error.response?.data?.error);
      console.log(error.response);
    }
  };

  return (
    <form className="m-4 flex flex-col w-72" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("username", { required: true })}
        placeholder="아이디"
        autoComplete="username"
        className="mb-4 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="password"
        {...register("password", { required: true })}
        placeholder="비밀번호"
        autoComplete="current-password"
        className="mb-6 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md py-3
                   transition shadow-md active:scale-95"
      >
        로그인
      </button>
    </form>
  );
}
