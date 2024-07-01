import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POSTリクエストを処理する関数
export async function POST(req: NextRequest) {
  try {
    // リクエストからusernameとimageを取得
    const { username, image } = await req.json();

    // データベースのユーザー情報を更新
    const user = await prisma.user.update({
      where: { username },
      data: { image },
    });

    // 成功レスポンスを返す
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    // エラーログをコンソールに出力
    console.error(error);
    // エラーレスポンスを返す
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
