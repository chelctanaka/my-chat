"use client";

import { useBoundStore } from "@/stores/useBoundStore";
import { create } from "zustand";

const useStore = create((set) => ({
  first: "first",
  second: "second",
  increasePopulation: () =>
    set(
      (state: any) => ({
        first: "change",
      }),
      true
    ),
}));

function BearCounter() {
  const { first, second } = useStore((state: any) => state);
  console.log(first);
  console.log(second);
  return (
    <>
      <h1>{first}</h1>
      <h1>{second}</h1>
    </>
  );
}

function Controls() {
  const increasePopulation = useStore((state: any) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

function App() {
  const bears = useBoundStore((state) => state.bears);
  const fishes = useBoundStore((state) => state.fishes);
  const addBear = useBoundStore((state) => state.addBear);
  const eatFish = useBoundStore((state) => state.eatFish);
  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
      <button onClick={() => eatFish()}>Eat a fish</button>
    </div>
  );
}

export default function Explore() {
  return <App />;
}
