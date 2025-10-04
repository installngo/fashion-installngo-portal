"use client";

import { useState } from "react";
import CourseForm from "@/components/admin/CourseForm";

export default function NewCoursePage() {
  const [done, setDone] = useState(false);

  if (done) {
    if (typeof window !== "undefined") window.location.href = "/admin/courses";
    return null;
  }

  return <CourseForm onDone={() => setDone(true)} />;
}