"use client";

import { SelectHTMLAttributes } from "react";
import clsx from "clsx";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  fullWidth?: boolean;
  fixedWidth?: string;
  uppercase?: boolean;
};

export default function Select({
  fullWidth,
  fixedWidth,
  uppercase,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center",
        fullWidth && "w-full",
        fixedWidth && fixedWidth
      )}
    >
      <select
        {...props}
        className={clsx(
          "p-2 rounded-md border text-sm font-base transition-colors w-full",
          "text-[var(--color-primary-text)] placeholder-[var(--color-secondary-text)]",
          "border-[var(--color-primary)] border-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]",
          uppercase && "uppercase",
          className
        )}
      >
        {children}
      </select>
    </div>
  );
}