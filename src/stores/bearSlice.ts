export const createBearSlice = (set: any) => ({
  bears: 0,
  addBear: () => set((state: any) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state: any) => ({ fishes: state.fishes - 1 })),
});
