import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  username: string; // ユーザーIDは最初は文字列として受け取られる
};

export async function GET(req: NextRequest, context: { params: Params }) {
  const username = context.params.username; // 文字列を整数に変換
  try {
    // ユーザー名でユーザーを検索
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // ユーザーが見つからない場合のレスポンス
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 成功メッセージとデータを返す
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    const errorMessage = error.message || "Unknown error";
    // エラーメッセージとステータスコード500を返す
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}
