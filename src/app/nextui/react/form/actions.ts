"use server";

import { FormModel } from "@/db/mongodb/models/form";
import { revalidatePath } from "next/cache";

export async function handleClientForm({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const data = await FormModel.create({
    name,
    email,
  });
  revalidatePath("/nextui/react/form");
}
