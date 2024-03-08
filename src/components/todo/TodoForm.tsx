"use client";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

import { useToast } from "@/components/ui/use-toast";

import { addTodo } from "@/actions/todo";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="flex-grow"
      type="submit"
      color="primary"
      size={"md"}
      isLoading={pending}
    >
      Add
    </Button>
  );
}

export default function TodoForm({ user }: { user: string }) {
  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTodoWithUser = addTodo.bind(null, user);
  // useFormState在表单提交后传出action的返回状态
  const [todoItem, formAction] = useFormState(addTodoWithUser, null);
  useEffect(() => {
    if (todoItem) {
      toast({
        // title: todoItem?.todo,
        description: `${todoItem?.todo} added in todo list.`,
        duration: 2000,
      });
    }
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
      <SubmitButton></SubmitButton>
    </form>
  );
}
