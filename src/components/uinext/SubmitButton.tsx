"use client";

import { useFormStatus } from "react-dom";
import React from "react";
import { Button } from "@nextui-org/react";

export function SubmitButton({
  text,
  disable = false,
}: {
  text: string;
  disable?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isDisabled={disable}
      color="primary"
      isLoading={pending}
    >
      {text}
    </Button>
  );
}
