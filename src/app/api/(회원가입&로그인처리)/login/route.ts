import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const body = await req.json();
    console.log('라우터가 받은 바디 :',body)
    const springurl = process.env.NEXT_PUBLIC_SPRING_URL;
    
    try {
        const res = await axios.post(`${springurl}/login`,body);
        const setCookieHeader = res.headers["set-cookie"];
        console.log('넥스트서버 디버깅 | api/login:',res.headers)
        const response = NextResponse.json(res.headers, { status: 200 });
        if (setCookieHeader) {
            
            if (Array.isArray(setCookieHeader)) {
                setCookieHeader.forEach(cookie => response.headers.append("Set-Cookie", cookie));
            } else {
                response.headers.append("Set-Cookie", setCookieHeader);
            }
        }
        return response;
    } catch (error:any) {
        console.error('로그인 요청 실패', error.message, "서버 응답 데이터 : " ,error.response.data);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}