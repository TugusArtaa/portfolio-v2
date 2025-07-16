"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/Shared/FormLayout";
import FormInput from "@/components/Shared/FormInput";
import ImageUpload from "@/components/Shared/ImageUpload";
import ToolsPreview from "@/components/Shared/ToolsPreview";
import LevelPicker from "@/components/Shared/LevelPicker";
import { useToast } from "@/components/UI/Toast";
import {
  validateForm,
  validateField,
  toolValidationRules,
} from "@/lib/validation";
import { Tool } from "@prisma/client";

interface ToolsFormProps {
  existing?: Tool;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const LEVEL_OPTIONS = [
  {
    label: "Beginner",
    value: "Beginner",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    label: "Intermediate",
    value: "Intermediate",
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  {
    label: "Advanced",
    value: "Advanced",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    label: "Expert",
    value: "Expert",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
];

export default function ToolsForm({
  existing,
  onSuccess,
  onCancel,
}: ToolsFormProps) {
  const [form, setForm] = useState({
    name: "",
    level: "",
    icon: "",
  });
  const [iconPreview, setIconPreview] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || "",
        level: existing.level || "",
        icon: existing.icon || "",
      });
      setIconPreview(existing.icon || "");
    }
  }, [existing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldRules = toolValidationRules[field];
    if (fieldRules) {
      const fieldError = validateField(
        form[field as keyof typeof form],
        fieldRules
      );
      setErrors((prev) => ({ ...prev, [field]: fieldError || "" }));
    }
  };

  const handleLevelSelect = (level: string) => {
    setForm((prev) => ({ ...prev, level }));
    setErrors((prev) => ({ ...prev, level: "" }));
    setTouched((prev) => ({ ...prev, level: true }));
  };

  const handleIconChange = (url: string) => {
    setForm((prev) => ({ ...prev, icon: url }));
    setIconPreview(url);
    if (errors.icon) setErrors((prev) => ({ ...prev, icon: "" }));
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate entire form
    const validation = validateForm(form, toolValidationRules);
    setErrors(validation.errors);

    if (!validation.isValid) {
      addToast({
        type: "error",
        title: "Form Tidak Valid",
        message: "Silakan perbaiki kesalahan pada form sebelum melanjutkan.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const method = existing ? "PUT" : "POST";
      const url = existing ? `/api/tools/${existing.id}` : "/api/tools";
      const payload = {
        ...form,
        id: existing
          ? existing.id
          : form.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") +
            "-" +
            Math.random().toString(36).slice(2, 8),
      };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        addToast({
          type: "success",
          title: existing ? "Tool Diperbarui" : "Tool Ditambahkan",
          message: existing
            ? "Tool berhasil diperbarui."
            : "Tool baru berhasil ditambahkan.",
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menyimpan",
        message: "Terjadi kesalahan saat menyimpan tool.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={existing ? "Edit Tool" : "Tambah Tool"}
      subtitle={
        existing ? "Edit detail tool Anda" : "Tambah tool baru ke daftar"
      }
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel={existing ? "Update Tool" : "Simpan Tool"}
      isSubmitting={isSubmitting}
      preview={
        <ToolsPreview name={form.name} level={form.level} icon={iconPreview} />
      }
    >
      <FormInput
        label="Nama Tool"
        name="name"
        placeholder="Contoh: VSCode, Figma"
        value={form.name}
        onChange={handleChange}
        onBlur={() => handleBlur("name")}
        required
        error={touched.name ? errors.name : ""}
      />

      {/* Level Picker */}
      <LevelPicker
        value={form.level}
        options={LEVEL_OPTIONS}
        onSelect={handleLevelSelect}
        error={errors.level}
        touched={touched.level}
        required
      />

      {/* Icon Upload */}
      <div className="space-y-2">
        <ImageUpload
          label="Icon Tool"
          value={form.icon}
          onChange={handleIconChange}
          onPreviewChange={setIconPreview}
          error={touched.icon ? errors.icon : ""}
        />
      </div>
    </FormLayout>
  );
}
