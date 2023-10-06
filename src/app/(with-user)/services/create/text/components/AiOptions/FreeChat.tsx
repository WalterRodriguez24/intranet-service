"use client";
import { FormEvent, KeyboardEvent, useRef } from "react";
import { Textarea } from "flowbite-react";

import Message from "@/components/Message";
import { ArrowLeft } from "@/icons/ArrowLeft";
import SendDiagonalIcon from "@/icons/SendDiagonal";
import { useAiChat } from "@/hooks/shared/useAiChat";

type Props = {
  onClose: () => void;
};

export default function FreeChat(props: Props) {
  const { onClose } = props;

  const { messages, sendMessage, loading } = useAiChat();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    const message = textArea.value.trim();
    if (!message) return;
    sendMessage(message);
    textArea.value = "";
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textArea = e.currentTarget;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      return;
    }

    if (e.key === "Enter" && e.shiftKey) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  };

  return (
    <aside className="absolute z-10 flex flex-col bg-white shadow-pale right-3 top-14 w-full max-w-xl rounded-2xl overflow-hidden h-[60vh] ">
      <header className="w-full flex gap-1 items-center p-2">
        <button
          className="p-2 rounded-full hover:bg-neutral-50"
          onClick={onClose}
        >
          <ArrowLeft width={16} height={16} />
        </button>

        <h5 className="font-semibold">Chat libre</h5>
      </header>
      <div className="flex-grow flex flex-col w-full overflow-auto">
        <Message
          avatar="/ia_avatar.png"
          message="Hola, soy tu asistente virtual, ¿en qué puedo ayudarte?"
        />
        {messages.map((message) => (
          <Message
            key={message.id}
            self={message.role ? message.role === "user" : false}
            avatar={message.avatar}
            message={message.content}
          />
        ))}
        {loading && (
          <div className="w-full animate-pulse flex">
            <Message
              self={false}
              avatar="/ia_avatar.png"
              message="Pensando..."
            />
          </div>
        )}
      </div>
      <form className="flex gap-2 items-end p-2" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Enviar mensaje"
          rows={1}
          autoFocus
          ref={textAreaRef}
          name="message"
          disabled={loading}
          onKeyDown={handleKeyDown}
          className="text-xs resize-none min-h-[2.5rem] max-h-[10rem] w-full flex-grow"
        />

        <button
          type="submit"
          disabled={loading}
          className="p-2.5 text-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-lime-200"
        >
          <SendDiagonalIcon />
        </button>
      </form>
    </aside>
  );
}
