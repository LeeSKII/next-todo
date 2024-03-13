"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { Drama, ChevronDown, Smile, Ship } from "lucide-react";
import React from "react";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";

import NavbarItemS from "@/components/uinext/NavbarItemS";

export default function Nav({ userInfo }: { userInfo?: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    { title: "Raw Todo", href: "/" },
    { title: "Home", href: "/nextui" },
    { title: "Next Todo", href: "/nextui/todo" },
    { title: "Tailwind SandBox", href: "/nextui/tailwind" },
    { title: "User", href: "/nextui/user" },
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
        {/* <NavbarItemS>
          <Link color="foreground" href="/">
            Raw Todo
          </Link>
        </NavbarItemS> */}
        <NavbarItemS href="/nextui">
          <Link href="/nextui" aria-current="page">
            Home
          </Link>
        </NavbarItemS>
        <NavbarItemS href="/nextui/todo">
          <Link href="/nextui/todo" aria-current="page">
            Todo
          </Link>
        </NavbarItemS>
        <NavbarItemS href="/nextui/tailwind">
          <Link color="foreground" href="/nextui/tailwind">
            Tailwind Sandbox
          </Link>
        </NavbarItemS>
        <NavbarItemS href="/nextui/user">
          <Link color="foreground" href="/nextui/user">
            User
          </Link>
        </NavbarItemS>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown size={20} />}
                radius="sm"
                variant="light"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="App other features"
            className="w-72"
            itemClasses={{
              base: "gap-3",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="Other things."
              startContent={<Smile />}
              href="/nextui/react"
            >
              useOptimistic
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Wait to do."
              startContent={<Ship className="text-green-800" />}
            >
              Wait to do
            </DropdownItem>

            <DropdownItem
              key="production_ready"
              description="Wait to do."
              startContent={<Ship className="text-yellow-900" />}
            >
              Wait to do
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Wait to do."
              startContent={<Ship className="text-orange-700" />}
            >
              Wait to do
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Wait to do."
              startContent={<Ship className="text-cyan-800" />}
            >
              Wait to do
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
