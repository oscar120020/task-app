import { NextFetchEvent, NextRequest, NextResponse } from "next/server"


export function middleware(req: NextRequest, ev: NextFetchEvent){
    // console.log(" middleware llamado ");

    // const id = req.nextUrl.pathname.split("/").pop() || "";
    
    // const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    // if(checkMongoIDRegExp.test(id)){
    //     const url = req.nextUrl.clone();
    //     url.pathname = "/nothing"
    //     return NextResponse.rewrite(url)
    // }
    
    
    // return NextResponse.next();
}

// export const config = {
//     matcher: ["/api/entries/:id"]
// }