import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // ユーザーIDを取得
    const { username } = await req.json();

    // ユーザーIDでユーザーを検索
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      // ユーザーが見つからない場合のメッセージとステータスコード404を返す
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 成功時のメッセージとステータスコード200を返す
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error: any) {
    // エラーをコンソールに出力
    console.error(error);
    // エラーメッセージを取得
    const errorMessage = error.message || "Unknown error";

    // エラーメッセージとステータスコード500を返す
    return NextResponse.json(
      { message: "Error", error: errorMessage },
      { status: 500 }
    );
  }
}
