import { Button } from "@nextui-org/react";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import UserInfo from "@/components/uinext/UserInfo";
import Nav from "@/components/uinext/Nav";
import SessionProvider from "./SessionProvider";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Todo Next UI",
  description: "Todo App made by Next UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // use cookies function to make this component and its children become dynamic render
  const token = cookies().get("user-token")?.value;
  if (!token) {
    redirect("/login");
  }
  return (
    <SessionProvider token={token}>
      {/* Because UserInfo component use cookies,any components use it will make parent components become dynamic render,if this UserInfo
      component imported in layout file,this behavior will cause all nested page become dynamic render */}
      <Nav userInfo={<UserInfo />}></Nav>
      {/* <Nav></Nav> */}
      {children}
    </SessionProvider>
  );
}
