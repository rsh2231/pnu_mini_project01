import { atom } from "jotai";
import { Logininfo } from "@/type/logininfo";
import { Role } from "@/type/registerinfo";  // Role enum import

export const isLoginAtom = atom<Logininfo>({
  isLogin: "logged-out",
  username: "",
  nickname: "",
  role: Role.GUEST,
  logintype: "",
  enabled: false,
});
