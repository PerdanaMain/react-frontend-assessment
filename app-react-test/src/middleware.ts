import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest)=>{

  const cookie = req.cookies.get("token");

  if(cookie){
    return NextResponse.next();
  }else{
    // return NextResponse.next();

    return NextResponse.redirect(new URL("/",req.url));
  }

}

export const config = {
  // halaman yg mau apply middleware
  matcher:"/users"
}