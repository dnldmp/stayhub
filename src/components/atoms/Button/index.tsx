import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({ text, ...rest }: ButtonProps) {
  return (
    <button
      className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-teal-500 rounded-md text-white hover:transition-all"
      {...rest}
    >
      {text}
    </button>
  );
}
