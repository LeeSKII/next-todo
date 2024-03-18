"use client";
import { decodeJwt } from "jose";
import React, { use } from "react";
import { UserContext } from "./UserContext";

export default function SessionProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const { userId, userName }: { userId: string; userName: string } =
    decodeJwt(token);
  return (
    <UserContext.Provider value={{ id: userId, name: userName }}>
      {children}
    </UserContext.Provider>
  );
}
