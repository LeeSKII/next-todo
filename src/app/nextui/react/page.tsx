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

  /**
   * optimisticMessages的初始状态是message
   * addOptimisticMessage是一个状态更新函数，参数1是当前的状态，参数2是addOptimisticMessage的参数
   * optimisticMessages在表单执行action动作的时候即表单状态为pending的时候等于addOptimisticMessage函数的返回值，否则等于messages的值
   * 因此使用optimisticMessages进行渲染结果即可
   */

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
