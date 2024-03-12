"use server";

import { verifyUser } from "@/lib/todo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login({
  account,
  password,
}: {
  account: string;
  password: string;
}) {
  // 处理登录逻辑
  if (account && password) {
    try {
      const user = await verifyUser({ account, password });
      if (user) {
        // 登录成功，设置cookie
        cookies().set("name", user.name, {
          secure: false,
          maxAge: 60 * 60 * 24 * 7, // One week
          path: "/",
        });
        return {
          status: "success",
          data: { ...user },
          message: "get user info success",
        };
      } else {
        return {
          status: "error",
          message: "Invalid account or password",
          data: { name: "" },
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { status: "error", message: error.message, data: { name: "" } };
      }
    }
  }
  return null;
}

export async function logout() {
  cookies().delete("name");
  redirect("/login");
}
