import Link from "next/link";
import React from "react";

export default function LinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="group" href={href}>
      <div className="flex items-center justify-center p-6 rounded-md border shadow-md group-hover:bg-slate-100 dark:group-hover:bg-slate-800 group-hover:shadow-xl">
        <span className="group-hover:text-blue-700 dark:group-hover:text-slate-100">
          {children}
        </span>
      </div>
    </Link>
  );
}
