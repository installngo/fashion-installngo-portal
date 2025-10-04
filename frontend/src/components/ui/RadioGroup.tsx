"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Radio({ label, className, ...props }: RadioProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        {...props}
        type="radio"
        className={clsx(
          "w-4 h-4 text-[var(--color-primary)] border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer",
          className
        )}
      />
      <span className="text-sm text-[var(--color-primary-text)]">{label}</span>
    </label>
  );
}

type RadioGroupProps = {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
};

export default function RadioGroup({
  name,
  options,
  value,
  onChange,
  className,
}: RadioGroupProps) {
  return (
    <div className={clsx("flex gap-6", className)}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          checked={value === opt.value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ))}
    </div>
  );
}