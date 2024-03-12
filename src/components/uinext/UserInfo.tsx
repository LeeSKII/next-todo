"use client";
import React from "react";
import { Avatar, Button, Link, Tooltip } from "@nextui-org/react";

import NavbarItemS from "@/components/uinext/NavbarItemS";
import LogoutButton from "@/components/LogoutButton";
import { logout } from "@/actions/login";
import { useBearStore } from "@/hook/useBear";

export default function UserInfo() {
  // isLogin
  const user = useBearStore((state) => state.user);
  return (
    <>
      {user ? (
        <>
          <NavbarItemS className="sm:flex">
            <Avatar
              color="primary"
              isBordered
              size={"sm"}
              name={user.name}
            ></Avatar>
          </NavbarItemS>
          <NavbarItemS className="sm:flex">
            <Tooltip content="Log out">
              <form action={logout}>
                <LogoutButton></LogoutButton>
              </form>
            </Tooltip>
          </NavbarItemS>
        </>
      ) : (
        <>
          <NavbarItemS className="sm:flex">
            <Link href="#">Login</Link>
          </NavbarItemS>
          <NavbarItemS>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItemS>
        </>
      )}
    </>
  );
}
