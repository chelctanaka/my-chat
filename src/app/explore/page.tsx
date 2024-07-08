"use client";

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

export default function Explore() {
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  );
}
