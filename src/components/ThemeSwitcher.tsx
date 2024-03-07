// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch, Skeleton } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(systemTheme === "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  //页面服务端渲染的时候不知道当前的theme，所以必须等mounted之后才能确认
  if (!mounted) {
    // avoid cls
    return (
      <Skeleton className="w-full rounded-lg">
        <div className="w-full px-3 h-6 rounded-lg bg-default-300"></div>
      </Skeleton>
    );
  }

  return (
    <div>
      <Switch
        isSelected={isSelected}
        onValueChange={() => {
          setIsSelected(!isSelected);
          setTheme(isSelected ? "dark" : "light");
        }}
        size={"sm"}
        color="secondary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      >
        {systemTheme}
      </Switch>
    </div>
  );
}
