import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

import { registerUser } from "@/lib/todo";

export default function Page() {
  async function register(formData: FormData) {
    "use server";
    const account = formData.get("account") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password");
    if (password !== confirmPassword) {
      redirect("/register?error=Passwords do not match");
    }
    if (account && password) {
      // 处理注册逻辑
      try {
        const user = await registerUser({ account, password });
        cookies().set("name", user.name);
      } catch (error) {
        if (error instanceof Error) {
          redirect(`/register?error=${error.message}`);
        }
      }
      redirect("/");
    }
  }
  return (
    <div className="container mx-auto p-2 flex items-center justify-center h-screen">
      <form
        action={register}
        className="flex flex-col items-center justify-center gap-3 fixed top-1/3 w-full"
      >
        <div className="space-x-2">
          <span>账户:</span>
          <input
            name="account"
            required
            className="p-2 border rounded-xl shadow-lg"
            type="text"
          />
        </div>
        <div className="space-x-2">
          <span>密码:</span>
          <input
            name="password"
            required
            className="p-2 border rounded-xl shadow-lg"
            type="password"
          />
        </div>
        <div className="space-x-2">
          <span>确认:</span>
          <input
            name="confirm-password"
            required
            className="p-2 border rounded-xl shadow-lg"
            type="password"
          />
        </div>
        <div className="mt-3 flex gap-2 items-center justify-center">
          <button
            className="bg-green-100 px-6 py-2 border rounded-3xl"
            type="submit"
          >
            Register
          </button>
          <Link
            href={"/login"}
            className="bg-blue-200 px-4 py-2 border rounded-3xl"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
