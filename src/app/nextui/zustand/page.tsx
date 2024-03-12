"use client";
import React from "react";
import { Switch } from "@nextui-org/react";
import { useBearStore } from "@/hook/useBear";

export default function Page() {
  const bear = useBearStore((state) => state.bears);
  const switchKey = useBearStore((state) => state.switch);
  return (
    <div className="container mx-auto m-3">
      <div>zustand store:</div>
      <div>{bear}</div>
      <div>
        <Switch isSelected={switchKey}></Switch>
      </div>
    </div>
  );
}
