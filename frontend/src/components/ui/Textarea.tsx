import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${props.className || ""}`}
    />
  );
}
