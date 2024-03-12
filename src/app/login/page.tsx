import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { verifyUser } from "@/lib/todo";

import { SubmitButton } from "@/components/SubmitButton";
import LoginForm from "@/app/login/LoginForm";

export default function Page() {
  return (
    <div className="container relative mx-auto flex items-center justify-center h-screen">
      <LoginForm></LoginForm>
    </div>
  );
}
