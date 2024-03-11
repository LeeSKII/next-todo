import { revalidatePath } from "next/cache";

import { SubmitButton } from "@/components/uinext/SubmitButton";
import UserModel from "@/db/mongodb/models/user";
import { getAllUsers } from "@/data/user";
import AddUserForm from "@/app/nextui/user/AddUserForm";

export default async function Page() {
  const users = await getAllUsers();

  return (
    <div className="container mx-auto">
      <div className="md:w-1/2 mx-auto p-3 ">
        <AddUserForm />
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
