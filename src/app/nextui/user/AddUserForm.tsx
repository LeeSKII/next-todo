"use client";
import React from "react";
import { Input, Switch } from "@nextui-org/react";
import { useFormState } from "react-dom";

import { addUser } from "@/actions/user";
import { SubmitButton } from "@/components/uinext/SubmitButton";
import { useBearStore } from "@/hook/useBear";

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

  const bear = useBearStore((state) => state.bears);
  const switchKey = useBearStore((state) => state.switch);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const changeSwitch = useBearStore((state) => state.changeSwitch);

  return (
    <>
      <div className="flex gap-3 justify-start items-center m-3 border rounded-md p-3">
        zustand:{bear}{" "}
        <button
          className="border p-3 w-24 rounded-md bg-slate-800 text-white"
          onClick={increasePopulation}
        >
          Add
        </button>
        <Switch
          isSelected={switchKey}
          onChange={changeSwitch}
          aria-label="Automatic updates"
        />
      </div>
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
    </>
  );
}
