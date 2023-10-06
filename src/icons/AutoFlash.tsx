import * as React from "react";

export default function AutoFlashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      fill="none"
      color="currentColor"
      {...props}
    >
      <path
        d="M16 9.5l.692-1.5M22 9.5L21.308 8m0 0L19 3l-2.308 5m4.616 0h-4.616M13 10h-3V3L2 14h6v7l6-8.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
