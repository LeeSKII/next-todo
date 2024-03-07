"use client";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

import { addTodo } from "@/actions/todo";

export default function TodoForm({ user }: { user: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const addTodoWithUser = addTodo.bind(null, user);
  // useFormState在表单提交后传出action的返回状态
  const [todoItem, formAction] = useFormState(addTodoWithUser, null);

  return (
    <form
      className="flex items-center justify-between gap-3 px-3"
      action={formAction}
    >
      <Input
        size="sm"
        ref={inputRef}
        name="todo"
        isRequired
        label="Wait to do"
      />
      <Button
        className="flex-grow"
        type="submit"
        defaultValue={"primary"}
        size={"md"}
        isDisabled={pending}
      >
        {pending ? "Add..." : "Add"}
      </Button>
      {todoItem?.todo}
    </form>
  );
}
