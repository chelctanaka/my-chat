import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Post = {
  id: string;
  userId: string;
  content: string;
};

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (content: string, userId: string) => Promise<void>;
  updatePost: (post: Post) => void;
  removePost: (postId: string) => void;
  fetchPosts: (username: string) => Promise<void>;
}

const usePostStore = create<
  PostState,
  [["zustand/subscribeWithSelector", never]]
>(
  subscribeWithSelector((set) => ({
    posts: [],
    setPosts: (posts) =>
      set((state) => ({
        posts: posts,
      })),
    addPost: async (content: string, userId: string) => {
      const res = await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({ userId, content }),
      });
      const { posts } = await res.json();
      set((state) => ({
        posts: [...state.posts, posts],
      }));
    },
    updatePost: (post) =>
      set((state) => ({
        posts: [...state.posts, post],
      })),
    removePost: (postId) =>
      set((state) => {
        const remainingPosts = state.posts.filter((post) => post.id !== postId);
        return {
          posts: remainingPosts,
        };
      }),
    fetchPosts: async (username: string) => {
      const res = await fetch(`/api/user/posts/${username}`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const { posts } = await res.json();
      set((state) => ({
        posts: posts,
      }));
    },
  }))
);

export default usePostStore;
