"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="border shadow-sm p-2 px-4 bg-orange-600 text-white rounded-lg"
    >
      Add
    </button>
  );
}
