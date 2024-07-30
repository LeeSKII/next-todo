"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Page() {
  const [lower, setLower] = React.useState("");
  const [bigger, setBigger] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());
  return (
    <div className="container my-3">
      <div className="flex flex-col gap-3 max-w-md mx-auto">
        <div>
          {lower}-{bigger}
        </div>
        <Input
          placeholder="lower"
          type="number"
          value={lower}
          onValueChange={(value) => {
            setLower(value);
            urlSearchParams.set("range", `${bigger}-${value}`);
            router.push(`${pathname}?${urlSearchParams}`);
          }}
        />
        <Input
          placeholder="bigger"
          type="number"
          value={bigger}
          onValueChange={(value) => {
            setBigger(value);
            urlSearchParams.set("range", `${value}-${lower}`);
            router.push(`${pathname}?${urlSearchParams}`);
          }}
        />
      </div>
    </div>
  );
}
