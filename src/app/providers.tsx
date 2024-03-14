// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { useSimpleBearStore } from "@/hook/useSimpleBear";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  //全局ZusTand初始化，这样可以在全客户端调用，但是切换session就会丢失
  useSimpleBearStore();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
