import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const springurl = process.env.NEXT_PUBLIC_SPRING_URL;
    const logname = "넥스트 서버 | api/login/userinfo | "
    console.log('req.boy : ',req)
    const token = req.headers.get("authorization") || ""
    console.log('req.token : ',token)
    try {
        const res = await axios.get(`${springurl}/loged-in/user`,{headers : {'authorization':token}})
        console.log(logname , "서버응답",res.data, res)
        return NextResponse.json( res.data, {status : 200});
    } catch (error:any) {
        
        console.error("유저 정보 요청 실패", error.message, "서버 응답 데이터 : " ,error.response.data);
        
        return NextResponse.json({ error: error.response.data }, { status: 401 });
    }
}