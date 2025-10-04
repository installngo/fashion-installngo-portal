"use client";

import Image from "next/image";

interface CourseCardProps {
  course: {
    image: string;
    title: string;
    originalPrice?: string;
    discountPrice?: string;
    discountPercentage?: string;
    isLive?: boolean;
    isRecorded?: boolean;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div
      className="
        shadow-lg rounded-2xl overflow-hidden 
        w-full max-w-[260px] h-[325px] flex flex-col
      "
    >
      {/* Image */}
      <Image
        src={course.image}
        alt={course.title}
        width={320}
        height={192}
        className="w-full h-40 object-full"
      />

      {/* Icons */}
      <div className="flex px-4 mt-2">
        {course.isLive && (
          <Image
            src="/icons/live.svg"
            alt="Live Classes"
            width={36}
            height={36}
          />
        )}
        {course.isRecorded && (
          <Image
            src="/icons/record.svg"
            alt="Recorded Classes"
            width={36}
            height={36}
          />
        )}
      </div>

      <h4 className="h2 font-bold px-4 mt-2 line-clamp-2">{course.title}</h4>

      <div className="mt-auto px-6 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-bold text-sm">
            ₹ {course.discountPrice}
          </span>
          <span className="text-green-600 line-through font-semibold text-sm">
            ₹ {course.originalPrice}
          </span>
          <span className="text-red-500 font-bold text-sm">
            {course.discountPercentage}
          </span>
        </div>
      </div>
    </div>
  );
}