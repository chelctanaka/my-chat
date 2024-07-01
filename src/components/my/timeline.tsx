"use client";

import { useEffect, useState } from "react";
import AddPost from "./addPost";
import { useSession } from "next-auth/react";
import Loading from "./loading";
import Post from "./post";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const username = session?.user?.username;
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const res = await fetch(`/api/user/posts/${username}`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const { posts } = await res.json();
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && userId) {
      fetchPosts();
    }
  }, [userId, status]);

  const addPost = async ({ content }: any) => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const res = await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({ content, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add post");
      }

      await res.json();
      // 新しい投稿を追加した後に最新の投稿を再度フェッチ
      setLoading(true);
      await fetchPosts();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const onDelete = async (postid: number) => {
    const res = await fetch(`/api/post/${postid}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error("Failed to delete post");
    }
    await fetchPosts();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AddPost addPost={addPost} />
      <div className="mt-4">
        {posts.map((post: any) => (
          <div key={post.id} className="mb-4">
            <Post
              username={post.username}
              postid={post.id}
              content={post.content}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </>
  );
}
