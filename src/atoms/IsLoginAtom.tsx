import { Logininfo } from "@/type/logininfo";
import { atom } from "jotai";

export const isLoginAtom = atom<Logininfo>({
    isLogin: 'logged-out',
    username: ''
});
