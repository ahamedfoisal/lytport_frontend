import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    let data = await db.query('select * from top_captions_per_day;');
    data.map((item) => {
        item.hashtags = item.hashtags.split(',');
    });
    return NextResponse.json(data);
}   