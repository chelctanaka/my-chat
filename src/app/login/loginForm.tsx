"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/action";
import { useFormState } from "react-dom";

export default function LoginForm() {
  // フォームの状態を管理するためのカスタムフックを使用
  const [errorMessage, dispatch, isPending] = useFormState(
    authenticate,
    undefined
  );
  // Google認証用のコード（現在コメントアウト）
  // const [errorMessageGoogle, dispatchGoogle] = useFormState(
  //   authenticateGoogle,
  //   undefined
  // );

  return (
    <form
      // フォームのスタイルと送信アクションを設定
      className="flex flex-col items-center justify-center space-y-4 mb-8"
      action={dispatch}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">ユーザーネーム</Label>
        <Input
          // ユーザーネーム入力フィールド
          type="text"
          id="username"
          name="username"
          placeholder="ユーザーネーム"
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">パスワード</Label>
        <Input
          // パスワード入力フィールド
          type="password"
          id="password"
          name="password"
          placeholder="パスワード"
          required
        />
      </div>
      <Button type="submit" disabled={isPending}>
        ログイン
      </Button>
      {errorMessage && (
        <>
          {/* エラーメッセージの表示 */}
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
    </form>
  );
}
{
  /* Google認証用のフォーム（現在コメントアウト）
  <form
        className="flex flex-col items-center justify-center space-y-4"
        action={dispatchGoogle}
      >
        <Button type="submit">Sign in with Google</Button>
      </form> */
}
