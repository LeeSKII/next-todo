"use server";
import UserModel from "@/db/mongodb/models/user";
import connect from "@/db/mongodb/connect";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";

export async function addUser(preState: any, formData: FormData) {
  const user = formData.get("account")?.toString();
  const password = formData.get("password")?.toString();
  if (!user || !password) return;
  try {
    await connect();

    // 创建用户
    await UserModel.create({
      name: user,
      password,
      createAt: dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    });
    revalidatePath("/nextui/user", "page");
    return { status: "success", data: { user } };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return {
          status: "failed",
          data: { message: `User name ${user} is existed!` },
        };
      } else {
        return { status: "failed", data: { message: error.message } };
      }
    }
  }
}
