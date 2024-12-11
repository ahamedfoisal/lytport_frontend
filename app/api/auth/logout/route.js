import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Clear cookies by setting them with an expired date
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear specific cookies related to authentication
    response.cookies.set("__clerk_db_jwt", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0), // Expire immediately
    });

     for (const cookieName of Object.keys(request.cookies)) {
      response.cookies.set(cookieName, "", {
        expires: new Date(0), // Expire immediately
      });
    }

    return response;
  } catch (error) {
    console.error("Error during logout:", error.message);
    return NextResponse.json(
      { error: "Failed to logout. Please try again." },
      { status: 500 }
    );
  }
}
