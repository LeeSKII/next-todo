"use client";
import React from "react";
import { Switch, Button } from "@nextui-org/react";
import { useBearStore } from "@/hook/useBear";
import { useSimpleBearStore } from "@/hook/useSimpleBear";

export default function Page() {
  const bear = useBearStore((state) => state.bears);
  const switchKey = useBearStore((state) => state.switch);
  const simpleBear = useSimpleBearStore((state) => state.bears);
  const addABear = useSimpleBearStore((state) => state.addABear);
  return (
    <div className="container mx-auto m-3">
      <div>zustand store:</div>
      <div>{bear}</div>
      <div>zustand simple store:</div>
      <div>{simpleBear}</div>
      <div>
        <Button onClick={addABear}>addASimpleBear</Button>
      </div>
      <div>
        <Switch isSelected={switchKey}></Switch>
      </div>
    </div>
  );
}
