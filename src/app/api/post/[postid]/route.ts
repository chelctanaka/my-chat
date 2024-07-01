import prisma from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Params }) {
  try {
    // パラメータからpostidを取得し、数値に変換
    const id = parseInt(context.params.postid);

    // Prismaを使って指定されたIDのポストを削除
    const post = await prisma.posts.delete({ where: { id } });

    // 成功メッセージと削除されたポストの情報を返す
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error: any) {
    // エラーログをコンソールに出力
    console.error("Error deleting post:", error);

    // エラーメッセージを設定し、500エラーを返す
    const errorMessage = error.message || "Unknown error";

    return NextResponse.json(
      { message: "Error", error: errorMessage },
      { status: 500 }
    );
  }
}
