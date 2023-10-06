import * as React from "react";

export default function SuggestionIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M3 3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6v13.8a.6.6 0 01-.6.6h-4.14a.6.6 0 00-.438.189l-3.385 3.597a.6.6 0 01-.874 0l-3.385-3.597A.6.6 0 007.74 18H3.6a.6.6 0 01-.6-.6V3.6z"
        stroke="currentColor"
      />
      <path
        d="M12 7l1.425 2.575L16 11l-2.575 1.425L12 15l-1.425-2.575L8 11l2.575-1.425L12 7z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
