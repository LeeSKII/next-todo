import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Avatar, Button, Link, Tooltip } from "@nextui-org/react";

import NavbarItemS from "@/components/uinext/NavbarItemS";
import LogoutButton from "@/components/LogoutButton";

async function logout() {
  "use server";
  cookies().delete("name");
  redirect("/login");
}

export default function UserInfo() {
  // isLogin
  const cookieStore = cookies();
  const user = cookieStore.get("name")?.value;
  const isLogin = user !== undefined;
  return (
    <>
      {isLogin ? (
        <>
          <NavbarItemS className="sm:flex">
            <Avatar color="primary" isBordered size={"sm"} name={user}></Avatar>
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
