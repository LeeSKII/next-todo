"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { Drama } from "lucide-react";
import React from "react";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";

import NavbarItemS from "@/components/uinext/NavbarItemS";

export default function Nav({ userInfo }: { userInfo: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    { title: "Raw Todo", href: "/" },
    { title: "Next Todo", href: "/nextui" },
    { title: "Tailwind SandBox", href: "/nextui/tailwind" },
  ];

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <Link href={"/"}>
          <NavbarBrand>
            <Drama />
            <p className="font-bold text-inherit">Drama</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItemS>
          <Link color="foreground" href="/">
            Raw Todo
          </Link>
        </NavbarItemS>
        <NavbarItemS href="/nextui">
          <Link href="/nextui" aria-current="page">
            Todo
          </Link>
        </NavbarItemS>
        <NavbarItemS href="/nextui/tailwind">
          <Link color="foreground" href="/nextui/tailwind">
            Tailwind Sandbox
          </Link>
        </NavbarItemS>
      </NavbarContent>
      <NavbarContent justify={"end"}>
        {userInfo}

        <NavbarItemS>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItemS>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              href={item.href}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
