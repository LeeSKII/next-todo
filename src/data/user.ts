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

export async function getUserById(userId: string): Promise<User | null> {
  await connect();
  const user = await UserModel.findById(userId).exec();
  if (user._id) {
    return user;
  }
  return null;
}
