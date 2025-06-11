export enum Role {
    ADMIN = "ROLE_ADMIN",
    MEMBER = "ROLE_MEMBER",
    MANAGER = "ROLE_MANAGER",
    GUEST = "ROLE_GUEST",
}

export type RegisterType = {
    enabled : boolean;
    username : string;
    password: string;
    nickname : string;
    role : Role;
}