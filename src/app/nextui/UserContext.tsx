"use client";
import { createContext, useContext } from "react";

import type { User } from "@/types/user";

export const UserContext = createContext<User>({
  id: "",
  name: "",
});
