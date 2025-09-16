"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Modal from "@/components/ui/Modal";

export default function NewCoursePage() {
  const router = useRouter();

  // States
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [courseTypes, setCourseTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [durations, setDurations] = useState<any[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [effectivePrice, setEffectivePrice] = useState<number>(0);
  const [status, setStatus] = useState("DRAFT");

  // Modal states
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newSubcategoryTitle, setNewSubcategoryTitle] = useState("");

  // Fetch categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`/api/subcategories?categoryId=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data));
    }
  }, [selectedCategory]);

  // Fetch course types
  useEffect(() => {
    fetch("/api/course-types")
      .then((res) => res.json())
      .then((data) => setCourseTypes(data));
  }, []);

  // Fetch durations when course type changes
  useEffect(() => {
    if (selectedType) {
      fetch(`/api/course-durations?typeCode=${selectedType}`)
        .then((res) => res.json())
        .then((data) => setDurations(data));
    }
  }, [selectedType]);

  // Auto calculate effective price
  useEffect(() => {
    let finalPrice = Number(price) - Number(discountPrice);
    if (finalPrice < 0) finalPrice = 0;
    setEffectivePrice(finalPrice);
  }, [price, discountPrice]);

  // Submit course
  const handleSubmit = async (statusCode: string) => {
    const payload = {
      course_title: courseTitle,
      course_description: courseDescription,
      thumbnail_url: thumbnailUrl,
      category_id: selectedCategory,
      subcategory_id: selectedSubcategory,
      course_type_code: selectedType,
      course_duration_code: selectedDuration,
      price,
      discount_price: discountPrice,
      effective_price: effectivePrice,
      status_code: statusCode,
    };

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/courses");
    } else {
      alert("Failed to create course");
    }
  };

  // Add category
  const handleAddCategory = async () => {
    if (!newCategoryTitle) return;
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_title: newCategoryTitle }),
    });
    setCategoryModalOpen(false);
    setNewCategoryTitle("");
    // refresh categories
    fetch("/api/categories").then((res) => res.json()).then(setCategories);
  };

  // Add subcategory
  const handleAddSubcategory = async () => {
    if (!newSubcategoryTitle || !selectedCategory) return;
    await fetch("/api/subcategories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subcategory_title: newSubcategoryTitle, category_id: selectedCategory }),
    });
    setSubcategoryModalOpen(false);
    setNewSubcategoryTitle("");
    // refresh subcategories
    fetch(`/api/subcategories?categoryId=${selectedCategory}`).then((res) => res.json()).then(setSubcategories);
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Course</h1>
      <form className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Course Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
          <Textarea placeholder="Course Description" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>{cat.category_title}</option>
              ))}
            </select>
            <Button type="button" variant="primary" onClick={() => setCategoryModalOpen(true)}>Add</Button>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.subcategory_title}</option>
              ))}
            </select>
            <Button type="button" variant="primary" onClick={() => setSubcategoryModalOpen(true)}>Add</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="">Select Course Type</option>
            {courseTypes.map((type) => (
              <option key={type.type_code} value={type.type_code}>{type.type_name}</option>
            ))}
          </select>

          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="">Select Duration</option>
            {durations.map((dur) => (
              <option key={dur.duration_code} value={dur.duration_code}>{dur.duration_name}</option>
            ))}
          </select>
        </div>

        <Input placeholder="Thumbnail URL" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />

        <div className="grid grid-cols-3 gap-4">
          <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} min={0} />
          <Input type="number" placeholder="Discount" value={discountPrice} onChange={(e) => setDiscountPrice(Number(e.target.value))} min={0} />
          <Input type="number" placeholder="Effective" value={effectivePrice} readOnly />
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border border-gray-300 rounded-lg w-full">
          <option value="DRAFT">Draft</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        <div className="flex gap-4 mt-4 flex-wrap">
          <Button type="button" variant="primary" onClick={() => handleSubmit("DRAFT")}>Save</Button>
          <Button type="button" variant="primary" onClick={() => handleSubmit("ACTIVE")}>Publish</Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/admin/courses")}>Cancel</Button>
        </div>
      </form>

      {/* Category Modal */}
      <Modal isOpen={isCategoryModalOpen} onClose={() => setCategoryModalOpen(false)} title="Add Category">
        <Input placeholder="Category Title" value={newCategoryTitle} onChange={(e) => setNewCategoryTitle(e.target.value)} />
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="secondary" onClick={() => setCategoryModalOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
        </div>
      </Modal>

      {/* Subcategory Modal */}
      <Modal isOpen={isSubcategoryModalOpen} onClose={() => setSubcategoryModalOpen(false)} title="Add Subcategory">
        <Input placeholder="Subcategory Title" value={newSubcategoryTitle} onChange={(e) => setNewSubcategoryTitle(e.target.value)} />
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="secondary" onClick={() => setSubcategoryModalOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddSubcategory}>Add</Button>
        </div>
      </Modal>
    </main>
  );
}
