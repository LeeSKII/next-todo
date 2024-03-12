"use client";
import React from "react";
import { useBearStore } from "@/hook/useBear";

export default function Page() {
  const bear = useBearStore((state) => state.bears);
  return (
    <div className="container mx-auto m-3">
      <div>zustand store:</div>
      <div>{bear}</div>
    </div>
  );
}
