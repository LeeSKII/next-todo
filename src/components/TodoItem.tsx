"use client";
import { useState, useRef, useEffect } from "react";
import { saveEditTodo } from "@/actions/todo";
import { TodoItem } from "@/types/todo";

export default function TodoItem({ todoItem }: { todoItem: TodoItem }) {
  const [todo, setTodo] = useState(todoItem);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(todoItem);
  const editInputRef = useRef<HTMLInputElement>(null);

  const saveEditTodoWithId = saveEditTodo.bind(null, todoItem.id);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);
  return (
    <div className="flex items-center space-x-2 justify-between">
      {!isEditing ? (
        <div className="mr-1 bg-slate-300 flex-grow">{todo.todo}</div>
      ) : (
        <form
          action={saveEditTodoWithId}
          onSubmit={() => {
            setIsEditing(!isEditing);
            // setTodo(editTodo);
          }}
          className="w-full"
        >
          <div className="space-x-4 flex">
            <input
              className="flex-grow"
              type="text"
              name="todo"
              ref={editInputRef}
              value={editTodo.todo}
              onChange={(e) =>
                setEditTodo({ ...editTodo, todo: e.target.value })
              }
            />
            {/* button的onClick事件会导致表单无法触发action，因此将onclick触发的动作放置到表单的onSubmit方法上 */}
            <button type="submit" className="border shadow-sm px-2 rounded-lg">
              Save
            </button>
          </div>
        </form>
      )}
      <div className="flex items-center space-x-4">
        {!isEditing && (
          <>
            <div>
              <input className="cursor-pointer" type="checkbox" />
              <label className="cursor-pointer">Finish</label>
            </div>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              className="border shadow-sm px-2 rounded-lg"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </>
        )}

        <button
          className="border shadow-sm px-2 rounded-lg"
          onClick={() => {
            console.log(`delete ${todo.id}`);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
