'use client'

import { RegisterType } from "@/type/registerinfo";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Register({ onclose }: { onclose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const inputRule = {
    required: "필수입력입니다.",
    pattern: {
      value: /^[a-zA-Z0-9ㄱ-ㅎ가-힣]+$/,
      message: "형식이 틀림",
    },
  };

  type ResisterInputFiled = {
    type: string;
    placeholder: string;
    autoComplete?: string;
    error?: string;
    registration: ReturnType<typeof register>;
  };

  function InputFiled({
    type,
    placeholder,
    autoComplete,
    error,
    registration,
  }: ResisterInputFiled) {
    return (
      <div className="mb-4 flex flex-col">
        <input
          type={type}
          {...registration}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {error && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{error}</p>
        )}
      </div>
    );
  }

  const onSubmit = async (data: RegisterType): Promise<void> => {
    const payload = { ...data, enabled: true };
    try {
      const response = await axios.post("api/register", payload);
      if (
        response.status === 200 &&
        response.data === "이미 존재하는 아이디 입니다."
      ) {
        alert(response.data);
      } else {
        alert(response.data);
        onclose();
      }
    } catch (error) {
      console.error("postSpring error:", error);
    }
  };

  return (
    <form
      className="m-4 flex flex-col text-gray-900 dark:text-white w-72"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputFiled
        type="text"
        placeholder="아이디"
        autoComplete="username"
        registration={register("username", inputRule)}
        error={errors.username?.message?.toString()}
      />
      <InputFiled
        type="password"
        placeholder="비밀번호"
        autoComplete="current-password"
        registration={register("password", inputRule)}
        error={errors.password?.message?.toString()}
      />
      <InputFiled
        type="text"
        placeholder="닉네임"
        autoComplete="nickname"
        registration={register("nickname", inputRule)}
        error={errors.nickname?.message?.toString()}
      />

      <div className="mb-4 mt-2 flex items-center gap-6 font-semibold">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("role", { required: "권한을 선택해주세요" })}
            type="radio"
            value="ROLE_MEMBER"
            className="accent-blue-500"
          />
          일반 사용자
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("role", { required: "권한을 선택해주세요" })}
            type="radio"
            value="ROLE_ADMIN"
            className="accent-blue-500"
          />
          관리자
        </label>
      </div>
      {errors.role && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">
          {errors.role.message?.toString()}
        </p>
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md py-3
                   transition shadow-md active:scale-95"
      >
        등록
      </button>
    </form>
  );
}
