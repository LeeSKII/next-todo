"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`border shadow-sm p-2 px-4  text-white rounded-lg ${
        pending ? "bg-orange-100" : "bg-orange-600"
      }`}
    >
      {pending ? "Saving" : "Add"}
    </button>
  );
}
