"use client";

import React from "react";
import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  disabled?: boolean;
}

export default function Switch({
  checked,
  onChange,
  leftLabel,
  rightLabel,
  disabled = false,
}: SwitchProps) {
  return (
    <div className="flex items-center gap-2">
      {leftLabel && (
        <span
          onClick={() => !disabled && onChange(false)}
          className={clsx(
            "cursor-pointer text-sm",
            !checked ? "text-[var(--color-primary)] font-medium" : "text-gray-500"
          )}
        >
          {leftLabel}
        </span>
      )}

      {/* Toggle Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-12 items-center rounded-full transition-colors",
          checked ? "bg-[var(--color-primary)]" : "bg-gray-300",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={clsx(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>

      {rightLabel && (
        <span
          onClick={() => !disabled && onChange(true)}
          className={clsx(
            "cursor-pointer text-sm",
            checked ? "text-[var(--color-primary)] font-medium" : "text-gray-500"
          )}
        >
          {rightLabel}
        </span>
      )}
    </div>
  );
}