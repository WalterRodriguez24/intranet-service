import * as React from "react";

export default function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} viewBox="0 0 24 24" height={24} fill="none" {...props}>
      <path
        d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10h-4c-3 0-4-1-4-4V2l8 8z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
