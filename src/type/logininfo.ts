import { Role } from "./registerinfo";

export type Logininfo = {
    isLogin : LoginStatus;
    role? : Role;
    nickname? : string;
    logintype?: string;
    username?: string;
    enabled?: boolean;
}
