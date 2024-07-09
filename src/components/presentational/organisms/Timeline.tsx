"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Post from "../molucules/Post";
import PostFormContainer from "@/components/container/molucules/PostFormContainer";
import usePostStore from "@/stores/postStore"; // postStoreをインポート

export default function Timeline() {
  const { posts, fetchPosts, addPost } = usePostStore(); // postStoreから関数と状態を取得
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const username = session?.user?.username;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && userId) {
      fetchPosts(username as string).finally(() => setLoading(false)); // fetchPostsを呼び出し
    }
  }, [userId, status]);

  const handleAddPost = async ({ content }: any) => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      await addPost(content, userId); // addPostを呼び出し
      setLoading(true);
      await fetchPosts(username as string); // 新しい投稿を追加した後に最新の投稿を再度フェッチ
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PostFormContainer addPost={handleAddPost} />
      <div className="mt-4">
        {posts.map((post: any) => (
          <div key={post.id} className="mb-4">
            <Post
              post={post}
              loading={loading}
              fetchPosts={() => fetchPosts(username)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
