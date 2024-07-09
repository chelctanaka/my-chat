import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type User = {
  id: string;
  username: string;
};

interface UserState {
  users: { [id: string]: User };
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

const useUserStore = create<
  UserState,
  [["zustand/subscribeWithSelector", never]]
>(
  subscribeWithSelector((set) => ({
    users: {},
    setUsers: (users) =>
      set((state) => ({
        users: users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
      })),
    addUser: (user) =>
      set((state) => ({
        users: { ...state.users, [user.id]: user },
      })),
    updateUser: (user) =>
      set((state) => ({
        users: { ...state.users, [user.id]: user },
      })),
    removeUser: (userId) =>
      set((state) => {
        const { [userId]: removedUser, ...remainingUsers } = state.users;
        return {
          users: remainingUsers,
        };
      }),
  }))
);

export default useUserStore;
