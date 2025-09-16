"use client";

import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();

  const handleNewCourse = () => {
    router.push("/admin/courses/new");
  };

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <button
          onClick={handleNewCourse}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + New Course
        </button>
      </div>

      {/* Later we’ll add course listing here */}
      <div className="text-gray-500">No courses available yet.</div>
    </main>
  );
}
