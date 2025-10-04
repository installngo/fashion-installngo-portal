"use client";

import { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";

type PriceInputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  fixedWidth?: string;
  calculated?: boolean;
};

export default function PriceInput({
  fullWidth,
  fixedWidth,
  className,
  value,
  onChange,
  calculated,
  ...props
}: PriceInputProps) {
  const [internalValue, setInternalValue] = useState<string>("0");

  // Format number with commas (no decimals)
  const formatNumber = (
    val: string | number | readonly string[] | undefined
  ) => {
    if (val === "" || val === null || val === undefined) return "0";
    if (Array.isArray(val)) val = val.join("");
    const num = Number(String(val).replace(/,/g, ""));
    if (isNaN(num)) return "0";

    return num.toLocaleString("en-IN", { maximumFractionDigits: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (calculated) return;

    const raw = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(raw))) {
      setInternalValue(formatNumber(raw));
      if (onChange) {
        onChange({
          ...e,
          target: { ...e.target, value: raw },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <div
      className={clsx(
        "relative flex items-center",
        fullWidth && "w-full",
        fixedWidth && fixedWidth
      )}
    >
      <span className="absolute left-3 text-[var(--color-primary-text)]">
        ₹
      </span>

      <input
        {...props}
        type="text"
        inputMode="numeric"
        value={value !== undefined ? formatNumber(value) : internalValue}
        onChange={handleChange}
        readOnly={calculated}
        tabIndex={calculated ? -1 : 0}
        className={clsx(
          "p-2 pl-7 pr-2 rounded-md border text-sm font-base transition-colors w-full text-right",
          "text-[var(--color-primary-text)] placeholder-[var(--color-secondary-text)]",
          "border-[var(--color-primary)] border-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]",
          calculated &&
            "bg-[var(--card-background)] text-gray-500 cursor-not-allowed focus:ring-0 focus:outline-none",
          className
        )}
      />
    </div>
  );
}
