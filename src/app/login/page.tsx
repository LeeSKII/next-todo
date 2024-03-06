import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { verifyUser } from "@/lib/todo";

import { SubmitButton } from "@/components/SubmitButton";

export default function Page() {
  async function login(formData: FormData) {
    "use server";
    const account = formData.get("account")?.toString();
    const password = formData.get("password")?.toString();
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
        } else {
          throw new Error("Invalid account or password");
        }
      } catch (error) {
        if (error instanceof Error) {
          redirect(`/login?error=${error.message}`);
        }
      }
      redirect("/");
    }
  }

  return (
    <div className="container relative mx-auto flex items-center justify-center h-screen">
      <form
        className="flex flex-col items-center justify-center gap-3 fixed top-1/3 w-full"
        action={login}
      >
        <div className="space-x-2">
          <span>账户:</span>
          <input
            name="account"
            className="p-2 border rounded-xl shadow-lg"
            type="text"
          />
        </div>
        <div className="space-x-2">
          <span>密码:</span>
          <input
            name="password"
            className="p-2 border rounded-xl shadow-lg"
            type="password"
          />
        </div>
        <div className="mt-3 flex gap-2 items-center justify-center">
          <SubmitButton text="Login" loadingText="Login..."></SubmitButton>
          <Link
            href={"/register"}
            className="bg-blue-200 px-4 py-2 border rounded-3xl"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
