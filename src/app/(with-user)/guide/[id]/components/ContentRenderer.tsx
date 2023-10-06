"use client";

import FreeChat from "@/components/AiOptions/FreeChat";
import AiIcon from "@/icons/AiIcon";
import { useState } from "react";
import { YoptaRenderer } from "yoopta-walterversion";

type Props = {
  data: any;
  title: string;
};

export default function ContentRenderer({ data, title }: Props) {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      {showChat && (
        <FreeChat
          firstMessage="Puedo ayudarte resolviendo dudas sobre el contenido de esta guia."
          messageContext={`las respuestans deben tener sentido con la guia: ${title}`}
          onClose={() => {
            setShowChat(false);
          }}
        />
      )}
      <button
        className="p-2 bg-white text-indigo-500 rounded-lg absolute right-3 top-3 z-10 hover:bg-indigo-50 cursor-pointer duration-100"
        onClick={() => {
          setShowChat(true);
        }}
      >
        <AiIcon />
      </button>
      <YoptaRenderer data={data} />
    </div>
  );
}
