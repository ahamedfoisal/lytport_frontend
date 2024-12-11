import { NextResponse } from "next/server";

export async function GET(request) {
    const dummy_data =   {
        data:[150, 200, 300, 250, 320, 180, 210]    
    };

    return NextResponse.json(dummy_data);

}
