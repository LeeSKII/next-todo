// import "server-only";
import { getUserById } from "@/data/user";
import connect from "@/db/mongodb/connect";

export async function verifyingUserId(userId: string) {
  await connect();
  const user = await getUserById(userId);
  if (user) {
    return true;
  } else {
    return false;
  }
}
