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
      {/* Because UserInfo component use cookies,any components use it will make parent components become dynamic render,if this UserInfo
      component imported in layout file,this behavior will cause all nested page become dynamic render */}
      <Nav userInfo={<UserInfo />}></Nav>
      {/* <Nav></Nav> */}
      {children}
    </>
  );
}
