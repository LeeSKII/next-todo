"use client";
import { NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import React from "react";

export default function NavbarItemS({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <NavbarItem
      className={className}
      isActive={href ? pathname.startsWith(href) : false}
    >
      {children}
    </NavbarItem>
  );
}
