"use client";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

import { useToast } from "@/components/ui/use-toast";

import { addTodo } from "@/actions/todo";

export default function TodoForm({ user }: { user: string }) {
  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTodoWithUser = addTodo.bind(null, user);
  // useFormState在表单提交后传出action的返回状态
  const [todoItem, formAction] = useFormState(addTodoWithUser, null);
  useEffect(() => {
    toast({
      // title: todoItem?.todo,
      description: `${todoItem?.todo} added in todo list.`,
      duration: 2000,
    });
    setTodo("");
    inputRef.current?.focus(); // 提交后自动聚焦输入框
  }, [todoItem]);

  return (
    <form
      className="flex items-center justify-between gap-3 px-3"
      action={formAction}
    >
      <Input
        size="sm"
        ref={inputRef}
        name="todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
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
    </form>
  );
}
