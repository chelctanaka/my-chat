import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get bio from request
    const { username, bio } = await req.json();

    // Update user's bio
    const user = await prisma.user.update({
      where: { username },
      data: { bio },
    });

    // Return success message and data
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
