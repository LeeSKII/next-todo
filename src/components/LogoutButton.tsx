"use client";
import { Button } from "@nextui-org/react";
import { LogOut } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button isLoading={pending} type="submit" isIconOnly color="primary">
      <LogOut size={"30"}></LogOut>
    </Button>
  );
}
