"use client";
import React from "react";
import { Avatar, Button, Link, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import NavbarItemS from "@/components/uinext/NavbarItemS";
import LogoutButton from "@/components/LogoutButton";

import { useBearStore } from "@/hook/useBear";
import { logout } from "@/actions/login";

export default function UserInfo() {
  // isLogin
  const user = useBearStore((state) => state.user);
  const clearUser = useBearStore((state) => state.clearUser);
  const router = useRouter();
  return (
    <>
      {user.name ? (
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
              <form
                onSubmit={async (e) => {
                  //在使用客户端的onSubmit时必须阻止表单的默认行为，否则会按照next.js的提交表单行为进行数据提交
                  e.preventDefault();
                  try {
                    const res = await logout();
                    if (res.status === "success") {
                      clearUser();
                      router.push("/login");
                    } else {
                      console.log("Log out error", res.status, res.message);
                    }
                  } catch (error) {
                    if (error instanceof Error) {
                      console.log("Log out", error.message);
                    }
                  }
                }}
              >
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
