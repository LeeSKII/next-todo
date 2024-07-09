"use client";
import { decodeJwt } from "jose";
import React from "react";
import { useRouter } from "next/navigation";

export default function useUser(token: string) {
  const router = useRouter();
  if (!token) {
    router.push("/login");
  }
  let userInfo: { userId: string; userName: string } = {
    userId: "",
    userName: "",
  };
  try {
    userInfo = decodeJwt(token);
  } catch (error) {
    console.log(error);
    router.push("/login");
  }
  return userInfo;
}
