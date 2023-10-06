import * as React from "react";

export default function ArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M18.07 14.43L12 20.5l-6.07-6.07M12 3.5v16.83"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
