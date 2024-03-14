"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("nextui error.tsx", error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-3 h-96">
      <h2 className="text-lg text-slate-700">Something went wrong!</h2>
      <p>{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
