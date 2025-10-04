"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Option from "@/components/ui/Option";
import RadioGroup from "@/components/ui/RadioGroup";
import PriceInput from "@/components/ui/PriceInput";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import { supabaseServer } from "@/lib/supabaseServer";

interface MasterOption {
  code_master_id: string;
  code_code: string;
  display_name: string;
  is_default: boolean;
  sub_codes: {
    sub_code_master_id: string;
    code_code: string;
    display_name: string;
    is_default: boolean;
  }[];
}

interface CourseData {
  course_id?: string;
  course_title?: string;
  course_description?: string;
  thumbnail_url?: string;
  category_code?: string;
  sub_category_code?: string;
  course_type?: "free" | "paid";
  validity_code?: string;
  original_price?: number;
  discount_price?: number;
  effective_price?: number;
}

export default function NewCoursePage({
  initialData,
  onDone, // callback from parent
}: {
  initialData?: CourseData;
  onDone: () => void;
}) {
  const { show: showLoading, hide: hideLoading } = useLoading();
  const { showToast } = useToast();

  const [courseTitle, setCourseTitle] = useState(
    initialData?.course_title || ""
  );
  const [courseDescription, setCourseDescription] = useState(
    initialData?.course_description || ""
  );
  const [courseType, setCourseType] = useState<"free" | "paid">(
    initialData?.course_type || "free"
  );
  const [originalPrice, setOriginalPrice] = useState<number | "">(
    initialData?.original_price ?? ""
  );
  const [discountPrice, setDiscountPrice] = useState<number | "">(
    initialData?.discount_price ?? ""
  );

  const effectivePrice =
    originalPrice !== "" && discountPrice !== ""
      ? Math.max(Number(originalPrice) - Number(discountPrice), 0)
      : "";

  const [categories, setCategories] = useState<MasterOption[]>([]);
  const [subCategories, setSubCategories] = useState<MasterOption["sub_codes"]>(
    []
  );
  const [validities, setValidities] = useState<MasterOption[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialData?.category_code || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    initialData?.sub_category_code || ""
  );
  const [selectedValidity, setSelectedValidity] = useState<string>(
    initialData?.validity_code || ""
  );

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnail_url || null
  );

  const [saving, setSaving] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch master data
  useEffect(() => {
    async function fetchMasterData(codeType: string) {
      const res = await fetch("/api/master", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code_type: codeType }),
      });
      const data = await res.json();
      return data.success ? data.data : [];
    }

    fetchMasterData("FASHIONCATEGORY").then((cats) => {
      setCategories(cats);
      if (!initialData?.category_code) {
        const defaultCat = cats.find((c: MasterOption) => c.is_default);
        if (defaultCat) setSelectedCategory(defaultCat.code_code);
      }
    });

    fetchMasterData("COURSEVALIDITY").then((vals) => {
      setValidities(vals);
      if (!initialData?.validity_code) {
        const defaultVal = vals.find((v: MasterOption) => v.is_default);
        if (defaultVal) setSelectedValidity(defaultVal.code_code);
      }
    });
  }, [token, initialData]);

  // Update subcategories when category changes
  useEffect(() => {
    const category = categories.find((c) => c.code_code === selectedCategory);
    if (category) {
      setSubCategories(category.sub_codes || []);
      if (!initialData?.sub_category_code) {
        const defaultSub = category.sub_codes.find((sc) => sc.is_default);
        setSelectedSubCategory(defaultSub ? defaultSub.code_code : "");
      }
    } else {
      setSubCategories([]);
      setSelectedSubCategory("");
    }
  }, [selectedCategory, categories, initialData]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 1.5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast("File is too large. Max 1.5 MB allowed.", "error");
      e.currentTarget.value = "";
      return;
    }

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      showToast("Invalid file type. Only PNG and JPEG are allowed.", "error");
      e.currentTarget.value = "";
      return;
    }

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const blobLoader = ({ src }: { src: string }) => src;

  const handleCancel = () => {
    onDone(); // go back to list
  };

  const handleSave = async () => {
    if (!courseTitle.trim())
      return showToast("Course title is required.", "error");
    if (!courseDescription.trim())
      return showToast("Course description is required.", "error");
    if (!selectedCategory)
      return showToast("Please select a category.", "error");
    if (!selectedValidity)
      return showToast("Please select a validity period.", "error");
    if (
      courseType === "paid" &&
      (originalPrice === "" || Number(originalPrice) <= 0)
    )
      return showToast("Original price is required for paid courses.", "error");

    setSaving(true);
    showLoading();

    try {
      let thumbnailPath = initialData?.thumbnail_url || null;

      if (thumbnailFile) {
        const fileExt = thumbnailFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabaseServer.storage
          .from("fashion-course-thumbnails")
          .upload(fileName, thumbnailFile, { upsert: true });

        if (error) throw new Error(error.message);

        const { data: publicData } = supabaseServer.storage
          .from("fashion-course-thumbnails")
          .getPublicUrl(data.path);
        thumbnailPath = publicData.publicUrl;
      }

      const payload = {
        course_id: initialData?.course_id,
        course_title: courseTitle.trim(),
        course_description: courseDescription.trim(),
        category_code: selectedCategory,
        sub_category_code: selectedSubCategory,
        course_type: courseType,
        validity_code: selectedValidity,
        original_price: courseType === "paid" ? originalPrice : null,
        discount_price: courseType === "paid" ? discountPrice : null,
        effective_price: courseType === "paid" ? effectivePrice : null,
        thumbnail_url: thumbnailPath,
      };

      const res = await fetch("/api/courses", {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        showToast(result.error || "Failed to save course", "error");
      } else {
        showToast(
          initialData
            ? "Course updated successfully!"
            : "Course created successfully!",
          "success"
        );
        onDone(); // back to list
      }
    } catch (err: unknown) {
      let message = "Something went wrong. Please try again.";
      if (err instanceof Error) message = err.message;
      console.error(message);
      showToast(message, "error");
    } finally {
      setSaving(false);
      hideLoading();
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold">
          {initialData ? "Edit Course" : "Create New Course"}
        </h1>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? (initialData ? "Updating..." : "Saving...") : "Save"}
          </Button>
        </div>
      </div>

      {/* Title + Description + Thumbnail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <div className="mb-4">
            <h4 className="block mb-2 font-medium">Course Title</h4>
            <Input
              placeholder="Enter course name"
              variant="text"
              fullWidth
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </div>
          <div>
            <h4 className="block mb-2 font-medium">Course Description</h4>
            <Textarea
              placeholder="Write a short description..."
              rows={4}
              fullWidth
              className="resize-none"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="block mb-2 font-medium">Course Thumbnail</h4>
          <label className="block w-full cursor-pointer flex-1">
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleThumbnailChange}
            />
            <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg hover:border-[var(--color-primary)] transition p-2 text-center min-h-[120px]">
              {thumbnailPreview ? (
                <Image
                  loader={blobLoader}
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  width={300}
                  height={180}
                  className="object-contain rounded-md"
                />
              ) : (
                <span className="text-sm text-[var(--color-secondary-text)]">
                  Recommended Image Size: 1200px x 720px, PNG or JPEG file
                </span>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Category & SubCategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full md:w-2/3">
        <div>
          <h4 className="block mb-2 font-medium">Category</h4>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <Option value="" disabled>
              Select category
            </Option>
            {categories.map((c) => (
              <Option key={c.code_master_id} value={c.code_code}>
                {c.display_name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <h4 className="block mb-2 font-medium">SubCategory</h4>
          <Select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            disabled={!subCategories.length}
          >
            <Option value="" disabled>
              Select subcategory
            </Option>
            {subCategories.map((sc) => (
              <Option key={sc.sub_code_master_id} value={sc.code_code}>
                {sc.display_name}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Course Type + Validity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full md:w-2/3">
        <div>
          <h4 className="block mb-2 font-medium">Course Type</h4>
          <RadioGroup
            name="courseType"
            options={[
              { label: "Free Course", value: "free" },
              { label: "Paid Course", value: "paid" },
            ]}
            value={courseType}
            onChange={(val) => setCourseType(val as "free" | "paid")}
          />
        </div>
        <div>
          <h4 className="block mb-2 font-medium">Course Validity</h4>
          <Select
            value={selectedValidity}
            onChange={(e) => setSelectedValidity(e.target.value)}
          >
            <Option value="" disabled>
              Select validity
            </Option>
            {validities.map((v) => (
              <Option key={v.code_master_id} value={v.code_code}>
                {v.display_name}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Pricing (Paid only) */}
      {courseType === "paid" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full md:w-2/3">
          <div>
            <h4 className="block mb-2 font-medium">Original Price</h4>
            <PriceInput
              placeholder="Enter price"
              value={originalPrice}
              onChange={(e) =>
                setOriginalPrice(e.target.value ? Number(e.target.value) : "")
              }
            />
          </div>
          <div>
            <h4 className="block mb-2 font-medium">Discount Price</h4>
            <PriceInput
              placeholder="Enter discount"
              value={discountPrice}
              onChange={(e) =>
                setDiscountPrice(e.target.value ? Number(e.target.value) : "")
              }
            />
          </div>
          <div>
            <h4 className="block mb-2 font-medium">Effective Price</h4>
            <PriceInput
              placeholder="Auto-calculated"
              value={effectivePrice || 0}
              calculated
            />
          </div>
        </div>
      )}
    </section>
  );
}
