"use client";

import { useForm } from "react-hook-form";
import PostForm from "@/components/presentational/molucules/PostForm";

export default function PostFormContainer({ addPost }: any) {
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  // テキストエリアの値を監視
  const content = form.watch("content");

  const onSubmit = async ({ content }: any) => {
    await addPost({ content });
    form.reset();
  };
  return <PostForm content={content} form={form} onSubmit={onSubmit} />;
}
