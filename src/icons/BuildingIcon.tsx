import * as React from "react";

export default function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12.5 22H4.08c-1.16 0-2.11-.93-2.11-2.07V5.09c0-2.62 1.95-3.81 4.34-2.64l4.44 2.18c.96.47 1.75 1.72 1.75 2.78V22zm0 0h6.31c2.16 0 3.16-1 3.16-3.16v-3.78c0-.07 0-.13-.01-.19-.06-1.92-1.14-2.6-2.46-2.89l-2.03-.45-4.5-1.01-.47-.1V22zm-7-13h3.47M5.5 13h3.47"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.47 11.53v3.22m0-3.22l-4.5-1.01v4.23c0 1.24 1.01 2.25 2.25 2.25s2.25-1.01 2.25-2.25m0-3.22l2.03.45c1.32.29 2.4.97 2.46 2.89A2.249 2.249 0 0119.72 17c-1.24 0-2.25-1.01-2.25-2.25"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
