export const createFishSlice = (set: any) => ({
  fishes: 10,
  addFish: () => set((state: any) => ({ fishes: state.fishes + 1 })),
});
