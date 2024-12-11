import {NextResponse} from "next/server";

export async function GET(request) {
    const dummy_data =  [
        { time: "Afternoon", value: 40, color: "#4A90E2" },
        { time: "Evening", value: 32, color: "#E94E77" },
        { time: "Morning", value: 28, color: "#50E3C2" },
      ];

    return NextResponse.json(dummy_data);
}