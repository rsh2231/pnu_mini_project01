'use client'
import { MouseEvent } from "react";

type Button01Color = "blue" | "orange" | "lime";

interface Button01Props {
  caption: string;
  bg_color: Button01Color;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button01({ caption, bg_color, onClick }: Button01Props) {
  const bg = {
    blue: "bg-blue-700 shadow-md",
    orange: "bg-orange-700 shadow-md",
    lime: "bg-lime-700 shadow-md",
  };

  const bgHover = {
    blue: "hover:bg-blue-500",
    orange: "hover:bg-orange-500",
    lime: "hover:bg-lime-500",
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${bg[bg_color]} ${bgHover[bg_color]}
        text-white font-semibold text-base
        rounded-lg px-4 py-2
        transition-colors duration-300 ease-in-out
        active:scale-95 active:brightness-90
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          bg_color === "blue"
            ? "focus:ring-blue-400 focus:ring-offset-indigo-900"
            : bg_color === "orange"
            ? "focus:ring-orange-400 focus:ring-offset-orange-900"
            : "focus:ring-lime-400 focus:ring-offset-lime-900"
        }
      `}
      type="button"
    >
      {caption}
    </button>
  );
}
