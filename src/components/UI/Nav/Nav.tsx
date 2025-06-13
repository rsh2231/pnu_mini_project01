'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button01 from "@/components/etc/Button01";
import LoginModal from "../Login/LoginModal";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { Logininfo } from "@/type/logininfo";
import { isLoginAtom } from "@/atoms/IsLoginAtom";
import axios from "axios";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [loginstate, setloginstate] = useAtom<Logininfo>(isLoginAtom);

  useEffect(() => {
    const token = sessionStorage.getItem('JwtToken')
    console.log(token)
    const getUserInfo = async () => {
      try {
        const res = await axios.get('/api/login/userinfo', {headers : {'authorization':token},withCredentials:true});
        console.log(res.data)
        setloginstate({isLogin:'logged-in'});
      } catch (error: any) {
        console.error("유저 불러오기 실패 Nav : ", error.response?.data?.error);
      }
    };
    getUserInfo();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    sessionStorage.removeItem('JwtToken')
    setloginstate({isLogin:'logged-out'})
    router.push("/"); // 로그아웃하면 홈으로 이동
  };

  return (
    <header className="bg-indigo-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">

        {/* 왼쪽 메뉴 */}
        <nav className="flex gap-8 items-center text-lg font-semibold select-none">
          <Link href="/" className="hover:text-violet-400 transition-colors duration-300">홈</Link>

          {loginstate.isLogin === "logged-in" && (
            <>          
              <Link href="/large-waste" className="hover:text-violet-400 transition-colors duration-300">대형폐기물</Link>
              <Link href="/dashboard" className="hover:text-violet-400 transition-colors duration-300">자유게시판</Link>
            </>
        )}
        </nav>

        {/* 오른쪽 로그인/로그아웃 버튼 */}
        <div className="flex gap-3 items-center">
          {loginstate.isLogin === 'logged-in' ? (
            <Button01
              caption="로그아웃"
              bg_color="orange"
              onClick={handleLogout}
            />
          ) : (
            <>
              <Button01
                caption="로그인"
                bg_color="blue"
                onClick={() => setOpen(true)}
              />
              {open && <LoginModal onclose={() => setOpen(false)} />}
            </>
          )}
        </div>

      </div>
    </header>
  );
}
