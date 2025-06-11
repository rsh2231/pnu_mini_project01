import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const sptingurl = process.env.NEXT_PUBLIC_SPRING_URL;
;
    const {provider , returnTo} = await req.json()
    const logname = "넥스트 서버 | api/login/oauth2 | "

    const redirectUrl = `${sptingurl}/oauth2/authorization/${provider}`;
    return NextResponse.json({ redirectUrl });
}