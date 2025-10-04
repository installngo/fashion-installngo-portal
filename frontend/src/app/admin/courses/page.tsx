"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/CourseCard";
import CourseForm from "@/components/admin/CourseForm";

interface Course {
  course_id: string;
  course_title: string;
  course_description: string;
  thumbnail_url?: string;
  category_code?: string;
  sub_category_code?: string;
  course_type?: "free" | "paid";
  validity_code?: string;
  original_price?: number;
  discount_price?: number;
  effective_price?: number;
}

export default function CoursesPage() {
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Fetch courses from API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setCourses(result.data || []);
      } else {
        console.error("Failed to fetch courses:", result.error);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = () => {
    setMode("create");
    setSelectedCourse(null);
  };

  const handleEdit = (course: Course) => {
    setMode("edit");
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setMode("list");
    setSelectedCourse(null);
    fetchCourses(); // Refresh list after create/edit
  };

  return (
    <section>
      {/* Header */}
      {mode === "list" && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Courses</h1>
          <Button variant="primary" onClick={handleCreate}>
            Create Course
          </Button>
        </div>
      )}

      {/* Content */}
      <div>
        {/* List Mode */}
        {mode === "list" && (
          <div>
            {loading ? (
              <p>Loading courses...</p>
            ) : courses.length === 0 ? (
              <p>No courses found.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {courses.map((course) => (
                  <div
                    key={course.course_id}
                    onClick={() => handleEdit(course)}
                    className="cursor-pointer"
                  >
                    <CourseCard
                      course={{
                        image: course.thumbnail_url || "/default-course.png",
                        title: course.course_title,
                        originalPrice:
                          course.original_price?.toString() || "0",
                        discountPrice:
                          course.discount_price?.toString() || "0",
                        discountPercentage: course.effective_price
                          ? `${(
                              ((course.original_price || 0) -
                                (course.discount_price || 0)) /
                              (course.original_price || 1)
                            ).toFixed(0)}% off`
                          : "0% off",
                        isLive: true,
                        isRecorded: true,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create / Edit Mode */}
        {(mode === "create" || (mode === "edit" && selectedCourse)) && (
          <div className="mt-1">
            <CourseForm
              key={selectedCourse?.course_id || "new"}
              initialData={selectedCourse || undefined}
              onDone={handleBackToList}
            />
          </div>
        )}
      </div>
    </section>
  );
}