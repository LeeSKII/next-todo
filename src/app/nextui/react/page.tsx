"use client";

import { useOptimistic, useState, useRef } from "react";
import { send } from "@/actions/mock";
import { Button, Input } from "@nextui-org/react";

type Message = {
  text: string;
  sending?: boolean;
  key?: number;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello there!", sending: false, key: 1 },
  ]);

  async function sendMessage(formData: FormData) {
    const sentMessage = await send(
      formData.get("message")?.toString() as string
    );
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message")?.toString() as string);
    formRef.current?.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  return (
    <div className="container mx-auto md:w-1/2 space-y-3">
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef} className="space-x-3">
        <input
          type="text"
          className="border rounded-md p-3"
          name="message"
          required
          placeholder="Message!"
        />
        <Button>Send</Button>
      </form>
    </div>
  );
}
