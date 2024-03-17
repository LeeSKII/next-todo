"use client";
import { handleClientForm } from "./actions";
import React, { useState } from "react";

export default function ClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="container mx-auto border p-3 rounded-xl">
      <form
        action={async (formData: FormData) => {
          console.log(formData.get("name")?.toString());
          //client component can call function exported in actions.ts file decorated with 'use server' as api endpoint
          //and can't directly call the server api endpoint
          //only can call the actions function decorated with 'use server'
          //or fetches data from server api endpoint using fetch api or other tools like axios or swr
          const response = await handleClientForm({
            name: formData.get("name")?.toString()!,
            email: formData.get("email")?.toString()!,
          });
          console.log(response);
        }}
        className="flex flex-col gap-3"
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md p-2"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2"
        />
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-4 max-w-24"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
