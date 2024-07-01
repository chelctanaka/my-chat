"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/action";
import { useState } from "react";

export default function SignupForm() {
  // フォームの状態を管理するためのフック
  const [errorMessage, dispatch, isPending] = useFormState(signup, undefined);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // パスワードの変更を処理する関数
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // パスワードのバリデーション
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError("パスワードは半角英数字8桁～16桁である必要があります。");
    } else {
      setPasswordError("");
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-4 mb-8"
      action={dispatch}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">ユーザーネーム</Label>
        <Input
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
          type="password"
          id="password"
          name="password"
          placeholder="パスワード"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending || passwordError !== ""}>
        {isPending ? "登録中..." : "登録"}
      </Button>
      {errorMessage && (
        <>
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
    </form>
  );
}
