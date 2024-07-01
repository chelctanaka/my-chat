import { atom, selector } from "recoil";

// Selector: 非同期にデータを取得
export const postsSelector = selector({
  key: "postsSelector",
  get: async () => {
    console.log("ここ２");
    try {
      const res = await fetch(`http://localhost:3000/api/post/12`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const { posts } = await res.json();
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return []; // エラー時には空の配列を返す
    }
  },
});

// Atom: postsSelectorの値を初期値として使用
export const postsAtom = atom({
  key: "postsAtom",
  default: [],
});
