"use client";

import { ArrowLeft } from "@/icons/ArrowLeft";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="p-2 rounded-full bg-white shadow-pale"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeft width={20} height={20} />
    </button>
  );
}
