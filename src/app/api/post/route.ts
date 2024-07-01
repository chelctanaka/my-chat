import prisma from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, userId } = await req.json();

    // 新しい投稿を作成
    const posts = await prisma.posts.create({
      data: { userId: parseInt(userId), content },
    });

    // 成功レスポンスを返す
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error: any) {
    // エラーログを記録
    console.error("Error creating post:", error);
    const errorMessage = error.message || "Unknown error";

    // エラーレスポンスを返す
    return NextResponse.json(
      { message: "Error", error: errorMessage },
      { status: 500 }
    );
  }
}
