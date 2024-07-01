import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // リクエストからユーザー名とパスワードを取得
    const { username, password } = await req.json();

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 新しいユーザーをデータベースに作成
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    // 成功メッセージとユーザー情報を返す
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error: any) {
    // エラーをログに出力
    console.error(error);

    // エラーメッセージを設定
    const errorMessage = error.message || "Unknown error";

    // エラーメッセージを返す
    return NextResponse.json(
      { message: "Error", error: errorMessage },
      { status: 500 }
    );
  }
}
