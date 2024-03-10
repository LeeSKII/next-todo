import UserModel from "@/db/mongodb/models/user";
import connect from "@/db/mongodb/connect";

import type { User } from "@/types/user";

export async function getAllUsers(): Promise<User[]> {
  await connect();
  const users = await UserModel.find();
  const userMap = users.map((user) => {
    return {
      id: user._id.toString(),
      name: user.name,
      password: user.password,
    };
  });
  return userMap;
}
