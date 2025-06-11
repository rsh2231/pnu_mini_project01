import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const springurl = process.env.SPRING_API;
    const logname = "넥스트 서버 | api log | "

    try {
        const res = await axios.get(`${springurl}/loged-in/user`,{headers : {Cookie:req.headers.get('cookie') || ""}})
        console.log(logname , "유저정보 쿠키",req.headers.get('cookie'))
        // console.log(logname , "서버응당",res)
        return NextResponse.json( res.data, {status : 200});
    } catch (error:any) {
        
        console.error("유저 정보 요청 실패", error.message, "서버 응답 데이터 : " ,error.response.data);
        
        return NextResponse.json({ error: error.response.data }, { status: 401 });
    }
}