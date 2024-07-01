import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  username: string; // ユーザーIDのパラメータ型定義
};

export async function GET(req: NextRequest, context: { params: Params }) {
  const username = context.params.username; // パラメータからユーザーIDを取得

  try {
    const userWithPosts = await prisma.user.findUnique({
      where: { username }, // ユーザーIDでユーザーを検索
      include: {
        posts: {
          orderBy: {
            updatedAt: "desc", // 投稿を更新日時の降順で並べ替え
          },
        },
      },
    });

    if (!userWithPosts) {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // ユーザーが見つからない場合のレスポンス
    }

    const posts = userWithPosts.posts.map((post) => ({
      ...post,
      username: userWithPosts.username, // 各投稿にユーザー名を追加
    }));

    return NextResponse.json({ message: "Success", posts }, { status: 200 }); // 成功時のレスポンス
  } catch (error: any) {
    console.error(error);
    const errorMessage = error.message || "Unknown error";
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 } // エラー時のレスポンス
    );
  }
}
