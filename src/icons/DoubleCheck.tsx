import * as React from "react";

export default function DoubleCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      {...props}
    >
      <path
        d="M1.5 12.5l4.076 4.076a.6.6 0 00.848 0L9 14m7-7l-4 4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M7 12l4.576 4.576a.6.6 0 00.848 0L22 7"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
