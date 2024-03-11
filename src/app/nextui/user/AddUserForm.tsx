"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { useFormState } from "react-dom";

import { addUser } from "@/actions/user";
import { SubmitButton } from "@/components/uinext/SubmitButton";

export default function AddUserForm() {
  const [message, addUserAction] = useFormState(addUser, null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const accountRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (message && message.status === "success") {
      formRef.current?.reset();
    } else {
      accountRef.current?.focus();
    }
  }, [message]);
  return (
    <form ref={formRef} action={addUserAction} className="space-y-3">
      <Input
        type="text"
        ref={accountRef}
        isRequired
        maxLength={20}
        name="account"
        label="Account"
      />
      <Input
        type="password"
        isRequired
        maxLength={20}
        name="password"
        label="Password"
      />
      {message && (
        <div className="text-red-700 text-lg text-center">
          {message.data.message}
        </div>
      )}
      <div className="w-full text-center">
        <SubmitButton text="Add" />
      </div>
    </form>
  );
}
