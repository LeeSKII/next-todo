import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function login(formData: FormData) {
    "use server";
    const account = formData.get("account");
    const password = formData.get("password");
    // 处理登录逻辑
    if (account && password) {
      if (account === "lee" && password === "123") {
        // 登录成功，设置cookie
        cookies().set("name", "lee", {
          secure: false,
          maxAge: 60 * 60 * 24 * 7, // One week
          path: "/",
        });
        redirect("/");
      }
    }
  }

  return (
    <div className="container relative mx-auto h-screen">
      <form
        className="w-full flex flex-col items-center justify-center gap-2 fixed top-1/3"
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
        <div className="mt-3">
          <button
            className="bg-green-100 px-6 py-2 border rounded-3xl"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
