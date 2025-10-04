"use client";

import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fullWidth?: boolean;
  fixedWidth?: string;
  uppercase?: boolean;
};

export default function Textarea({
  fullWidth,
  fixedWidth,
  uppercase,
  className,
  ...props
}: TextareaProps) {
  return (
    <div
      className={clsx(
        "relative flex items-start",
        fullWidth && "w-full",
        fixedWidth && fixedWidth
      )}
    >
      <textarea
        {...props}
        className={clsx(
          "p-2 rounded-md border text-sm font-base transition-colors w-full resize-none",
          "text-[var(--color-primary-text)] placeholder-[var(--color-secondary-text)]",
          "border-[var(--color-primary)] border-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]",
          uppercase && "uppercase",
          className
        )}
      />
    </div>
  );
}
