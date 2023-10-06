import * as React from "react";

export default function AudioIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M22 15V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.74 15.18a2.12 2.12 0 11-4.24 0 2.12 2.12 0 014.24 0zm0 0V7.77m0 0v.62c0 .6.46 1.24 1.03 1.43l2.34.78c.76.26 1.39-.19 1.39-1v-.62c0-.6-.46-1.24-1.03-1.43l-2.34-.78c-.77-.26-1.39.2-1.39 1z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
