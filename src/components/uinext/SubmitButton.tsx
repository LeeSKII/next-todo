"use client";

import { useFormStatus } from "react-dom";
import React from "react";
import { Button } from "@nextui-org/react";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" isLoading={pending}>
      {text}
    </Button>
  );
}
