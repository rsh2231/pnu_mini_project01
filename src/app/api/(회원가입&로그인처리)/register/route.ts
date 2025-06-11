import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const springurl = process.env.NEXT_PUBLIC_SPRING_URL;
    try {
        const res = await axios.post(`${springurl}/registeration`, body); // 로컬에서 Spring에 접속
        return NextResponse.json(res.data, { status: 200 });
    } catch (error: any) {
        console.error("회원가입 요청 실패", error.message, "서버 응답 데이터 : " ,error.response.data);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}