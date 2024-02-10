"use client";

import { SetStateAction, useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", {
      message,
    });
  };

  const handleMessageChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <main className="h-screen w-full flex justify-center items-center gap-x-2">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input placeholder="Message..." onChange={handleMessageChange} />
        <button type="submit"> Send Message </button>
      </form>
      {messageReceived}
    </main>
  );
}
