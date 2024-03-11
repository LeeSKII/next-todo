import { Button } from "@nextui-org/react";
import type { Metadata } from "next";
import Link from "next/link";

import UserInfo from "@/components/uinext/UserInfo";
import Nav from "@/components/uinext/Nav";
import NavbarItemS from "@/components/uinext/NavbarItemS";

export const metadata: Metadata = {
  title: "Todo Next UI",
  description: "Todo App made by Next UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Nav userInfo={<UserInfo />}></Nav> */}
      <Nav></Nav>
      {children}
    </>
  );
}
