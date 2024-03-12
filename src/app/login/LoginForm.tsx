"use client";
import { useState, useEffect } from "react";
import { Input, Button, Link } from "@nextui-org/react";

import { login } from "@/actions/login";
import { useBearStore } from "@/hook/useBear";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isLogining, setIsLogining] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const setUser = useBearStore((state) => state.setUser);
  const router = useRouter();

  return (
    <>
      <form
        className="flex flex-col gap-3 w-64"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLogining(true);
          try {
            const res = await login({ account, password });
            if (res && res.status === "success") {
              setUser({ name: res.data.name });
              router.push("/nextui/");
            } else {
              setErrorMsg(res ? res.message : "Unknown error");
            }
          } catch (error) {
            if (error instanceof Error) setErrorMsg(error.message);
          } finally {
            setIsLogining(false);
          }
        }}
      >
        <Input
          label="Account"
          name="account"
          type="text"
          isRequired
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          maxLength={20}
        ></Input>
        <Input
          label="Password"
          name="password"
          type="password"
          isRequired
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={20}
        ></Input>
        {errorMsg && (
          <div className="w-full text-red-800 text-lg">{errorMsg}</div>
        )}
        <div className="flex justify-center items-center gap-3">
          <Button type="submit" isLoading={isLogining} color="primary">
            Login
          </Button>
          <Link
            href={"/register"}
            className="bg-blue-200 px-4 py-2 border rounded-3xl"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
}
