"use client";
import { signOut } from "next-auth/react";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";

export default function ProfileHeaderButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        signOut().then(() => router.push("/"));
      }}
    >
      <Avatar size={40} name="John Doe" />
    </button>
  );
}
