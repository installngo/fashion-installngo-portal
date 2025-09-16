"use client";

import { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "text" | "email" | "password" | "number";
  fullWidth?: boolean;
  fixedWidth?: string;
  placeholder?: string;
  uppercase?: boolean;
};

export default function Input({
  variant = "text",
  fullWidth,
  fixedWidth,
  uppercase,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = variant === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : variant;

  return (
    <div
      className={clsx(
        "relative flex items-center",
        fullWidth && "w-full",
        fixedWidth && fixedWidth
      )}
    >
      <input
        {...props}
        type={inputType}
        autoComplete="off"
        className={clsx(
          "p-2 rounded-md border text-sm font-base transition-colors w-full",
          isPassword ? "pr-10" : "pr-2",
          "text-[var(--color-primary-text)] placeholder-[var(--color-secondary-text)]",
          "border-[var(--color-primary)] border-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]",
          uppercase && "uppercase",
          className
        )}
      />
      {isPassword && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer select-none"
        >
          {showPassword ? (
            <Eye className="w-5 h-5 text-[var(--color-primary-text)]" />
          ) : (
            <EyeOff className="w-5 h-5 text-[var(--color-primary-text)]" />
          )}
        </span>
      )}
    </div>
  );
}