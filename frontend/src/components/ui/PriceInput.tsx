import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type PriceInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function PriceInput({ className, ...props }: PriceInputProps) {
  return (
    <input
      type="number"
      min="0"
      step="0.01"
      {...props}
      className={clsx(
        "p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500",
        className
      )}
    />
  );
}
