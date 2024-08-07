import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Todo App",
  description: "My todo app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 增加suppressHydrationWarning消除next-theme警告
    <html suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <Providers>{children}</Providers>
          <Toaster />
        </AntdRegistry>
      </body>
    </html>
  );
}
