import { useEffect, useState } from "react";

type RequestMessage = {
  role: "assistant" | "user";
  content: string;
};

type ResponseMessage = {
  id: string;
} & RequestMessage;

type Message = {
  avatar?: string;
} & ResponseMessage;

async function sendMessageService(
  messages: RequestMessage[]
): Promise<ResponseMessage> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  console.log(data);
  return data;
}

type Options = {
  onResponse?: (message: Message) => void;
};

export function useAiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (messages.length === 0) return;
    if (messages[messages.length - 1].role === "assistant") return;

    setError(false);
    setLoading(true);
    sendMessageService(
      messages.map((message) => ({
        role: message.role,
        content: message.content,
      }))
    )
      .then((response) => {
        const newMessage: Message = {
          avatar: "/ia_avatar.png",
          ...response,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [messages]);

  const sendMessage = async (message: string) => {
    const newMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: message,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return {
    messages,
    sendMessage,
    error,
    loading,
  };
}
