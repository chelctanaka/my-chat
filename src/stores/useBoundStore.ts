import { create } from "zustand";
import { createBearSlice } from "./bearSlice";
import { createFishSlice } from "./fishSlice";

export const useBoundStore = create((a: any) => ({
  ...createBearSlice(a),
  ...createFishSlice(a),
}));
