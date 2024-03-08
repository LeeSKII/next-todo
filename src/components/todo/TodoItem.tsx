"use client";
import { useState, useRef, useEffect, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { XSquare, Pencil, Save } from "lucide-react";
import { Button, Checkbox, Input } from "@nextui-org/react";

import { useToast } from "@/components/ui/use-toast";
import { TodoItem } from "@/types/todo";
import { useFormStatus } from "react-dom";
import { deleteTodoById, updateTodo } from "@/actions/todo";

function SubmitSaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      isLoading={pending}
      isIconOnly
      size="sm"
      variant="light"
      type="submit"
    >
      <Save />
    </Button>
  );
}

export default function TodoItem({ todoItem }: { todoItem: TodoItem }) {
  const [todo, setTodo] = useState(todoItem);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(todoItem);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todoItem.isCompleted);
  const editInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);
  return (
    <div
      className={`flex items-center space-x-2 justify-between border-b-2  p-2 rounded-md shadow-sm`}
    >
      {!isEditing ? (
        <div className={`mr-1 flex-grow ${isCompleted ? "line-through" : ""}`}>
          {todo.todo}
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsEditing(!isEditing);

            //Optimistic update by handy
            if (
              editTodo.todo === todo.todo &&
              editTodo.isCompleted === todo.isCompleted
            ) {
              return;
            } else {
              setTodo({ ...editTodo });
            }
            try {
              const data = await updateTodo(editTodo);
              if (typeof data === "string") {
                setTodo({ ...todo });
                toast({
                  title: "Update failed",
                  description: `${todo.todo} is Updated failed,Error is ${data}!.`,
                  duration: 2000,
                });
              } else {
                toast({
                  title: "Update Success",
                  description: `${todo.todo} is Updated to ${editTodo.todo}!.`,
                  duration: 2000,
                });
              }
            } catch (error) {
              setTodo({ ...todo });
            }
          }}
          className="w-full"
        >
          <div className="space-x-4 flex items-center">
            <Input
              defaultValue={editTodo.todo}
              name="todo"
              isRequired
              maxLength={50}
              ref={editInputRef}
              onChange={(e) =>
                setEditTodo({ ...editTodo, todo: e.target.value })
              }
            ></Input>
            {/* button的onClick事件会导致表单无法触发action，因此将onclick触发的动作放置到表单的onSubmit方法上 */}
            <SubmitSaveButton></SubmitSaveButton>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onClick={() => {
                setIsEditing(false);
                setEditTodo({ ...todo });
              }}
            >
              <XSquare></XSquare>
            </Button>
          </div>
        </form>
      )}
      <div className="flex items-center gap-1">
        {!isEditing && (
          <>
            <div className="flex items-center">
              <Checkbox
                radius="full"
                size="lg"
                isSelected={isCompleted}
                onChange={async (e) => {
                  setIsCompleted(!isCompleted);
                  const data = await updateTodo({
                    ...editTodo,
                    isCompleted: e.target.checked,
                  });
                  if (typeof data === "string") {
                    setIsCompleted(isCompleted);
                    toast({
                      title: "Update failed",
                      description: `${todo.todo} is Updated failed,Error is ${data}!.`,
                      duration: 2000,
                    });
                  } else {
                    setEditTodo({
                      ...editTodo,
                      isCompleted: !editTodo.isCompleted,
                    });
                    toast({
                      title: e.target.checked
                        ? "Bonus You have done great!!!"
                        : "Oops task restarted!!!",
                      description: e.target.checked
                        ? `${todo.todo} is done!.`
                        : `${todo.todo} is opened now!.`,
                      duration: 2000,
                    });
                  }
                }}
              ></Checkbox>
            </div>
            <Button
              isIconOnly
              variant="light"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <Pencil></Pencil>
            </Button>
            <Button
              isLoading={isDeleting}
              isIconOnly
              variant="light"
              onClick={async () => {
                setIsDeleting(true);
                try {
                  const data = await deleteTodoById(todo.id);
                  if (data === "success") {
                    toast({
                      title: "Deleting Success",
                      description: `${todo.todo} is deleted!.`,
                      duration: 2000,
                    });
                    router.refresh();
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    toast({
                      title: "Deleting Failed",
                      description: `Deleting ${todo.todo} failed,The error is${error.message}!.`,
                      duration: 2000,
                    });
                  }
                } finally {
                  setIsDeleting(false);
                }
              }}
            >
              <XSquare></XSquare>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
