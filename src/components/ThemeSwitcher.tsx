// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch, Skeleton } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  //页面服务端渲染的时候不知道当前的theme，所以必须等mounted之后才能确认
  if (!mounted) {
    // avoid cls
    return (
      // <Skeleton className="w-12 px-3 rounded-full">
      //   <div className="w-full px-3 h-6 rounded-lg"></div>
      // </Skeleton>
      <div>
        <Switch
          isSelected={true}
          size={"sm"}
          color="primary"
          thumbIcon={<SunIcon />}
        ></Switch>
      </div>
    );
  }

  return (
    <div>
      <Switch
        isSelected={isSelected}
        onValueChange={(val) => {
          setIsSelected(!isSelected);
          setTheme(val ? "light" : "dark");
        }}
        size={"sm"}
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      ></Switch>
    </div>
  );
}
