"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
};

export default function Button({
  variant = "primary",
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";

  const variantClasses = {
    primary: "bg-[var(--button-primary)] text-[var(--button-text-inverse)] hover:bg-[var(--button-primary-hover)]",
    secondary: "bg-[var(--button-secondary)] text-[var(--button-secondary-text)] hover:bg-[var(--button-secondary-hover)]",
    danger: "bg-[var(--button-danger)] text-[var(--button-danger-text)] hover:bg-[var(--button-danger-hover)]",
  };

  return (
    <button
      {...props}
      className={clsx(
        baseClasses,
        fullWidth ? "w-full" : "w-36",
        variantClasses[variant],
        className
      )}
    />
  );
}
