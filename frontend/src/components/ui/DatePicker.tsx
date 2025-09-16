"use client";

import { useState } from "react";
import clsx from "clsx";

type DatePickerProps = {
  label?: string;
  value?: string; // ISO string (YYYY-MM-DD)
  onChange: (value: string) => void;
  className?: string;
};

export default function DatePicker({ label, value, onChange, className }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
