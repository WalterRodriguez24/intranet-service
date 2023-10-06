"use client";

import Avvvatars from "avvvatars-react";

type AvatarProps = {
  name?: string;
  size?: number;
  src?: string;
};

export default function Avatar(props: AvatarProps) {
  const { name = "", size, src } = props;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="rounded-full object-cover"
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <Avvvatars value={name} size={size} style={name ? "character" : "shape"} />
  );
}
