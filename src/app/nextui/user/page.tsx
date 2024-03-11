import { Input, Button } from "@nextui-org/react";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

import { SubmitButton } from "@/components/uinext/SubmitButton";
import UserModel from "@/db/mongodb/models/user";
import connect from "@/db/mongodb/connect";
import { getAllUsers } from "@/data/user";

export default async function Page() {
  const users = await getAllUsers();
  await connect();

  async function addUser(formData: FormData) {
    "use server";
    const user = formData.get("account")?.toString();
    const password = formData.get("password")?.toString();
    if (!user || !password) return;

    // 创建用户
    await UserModel.create({
      name: user,
      password,
      createAt: dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
    });
    revalidatePath("/nextui/user", "page");
  }

  return (
    <div className="container mx-auto">
      <div className="md:w-1/2 mx-auto p-3 ">
        <form action={addUser} className="space-y-3">
          <Input
            type="text"
            isRequired
            maxLength={20}
            name="account"
            label="Account"
          />
          <Input
            type="password"
            isRequired
            maxLength={20}
            name="password"
            label="Password"
          />
          <div className="w-full text-center">
            <SubmitButton text="Add" />
          </div>
        </form>
      </div>
      <div className="md:w-1/2 mx-auto border rounded-md p-3 divide-y-1 flex flex-col gap-1">
        {users.map((user) => {
          return (
            <div key={user.id} className="font-bold h-12 flex items-center">
              <form
                className="flex items-center w-full justify-between"
                action={async () => {
                  "use server";
                  await UserModel.findByIdAndDelete(user.id);
                  revalidatePath("/nextui/user", "page");
                }}
              >
                <div>{user.name}</div>
                <div>
                  <SubmitButton text="Delete" />
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
