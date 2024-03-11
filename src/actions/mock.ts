"use server";

export async function send(message: string): Promise<string> {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
