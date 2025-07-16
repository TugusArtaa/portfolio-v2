"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/Shared/FormLayout";
import FormInput from "@/components/Shared/FormInput";
import AboutPreview from "@/components/Shared/AboutPreview";
import AboutIdPicker from "@/components/Shared/AboutIdPicker";
import { useToast } from "@/components/UI/Toast";
import {
  validateForm,
  validateField,
  aboutValidationRules,
} from "@/lib/validation";
import { About } from "@prisma/client";

const ABOUT_IDS = [
  {
    value: "who_am_i",
    label: "Who Am I",
    icon: "👤",
    color:
      "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600",
  },
  {
    value: "education",
    label: "Education",
    icon: "🎓",
    color:
      "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600",
  },
  {
    value: "quote",
    label: "Quote",
    icon: "💭",
    color:
      "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: "📱",
    color:
      "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-600",
  },
  {
    value: "gmail",
    label: "Gmail",
    icon: "✉️",
    color: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-600",
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: "📸",
    color:
      "bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-600",
  },
  {
    value: "github",
    label: "GitHub",
    icon: "💻",
    color:
      "bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-600",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: "🔗",
    color:
      "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600",
  },
  {
    value: "discord",
    label: "Discord",
    icon: "🎮",
    color:
      "bg-violet-100 dark:bg-violet-900/30 border-violet-300 dark:border-violet-600",
  },
  {
    value: "call_to_action",
    label: "Call To Action",
    icon: "🚀",
    color:
      "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-600",
  },
] as const;

interface AboutFormProps {
  existing?: About;
  onSuccess?: () => void;
  onCancel?: () => void;
  usedIds?: string[];
}

export default function AboutForm({
  existing,
  onSuccess,
  onCancel,
  usedIds = [],
}: AboutFormProps) {
  const [form, setForm] = useState({
    id: "",
    content: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllIds, setShowAllIds] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (existing) {
      setForm({
        id: existing.id || "",
        content: existing.content || "",
      });
    }
  }, [existing]);

  const availableIds = existing
    ? [
        {
          value: existing.id,
          label:
            ABOUT_IDS.find((x) => x.value === existing.id)?.label ||
            existing.id,
          icon: ABOUT_IDS.find((x) => x.value === existing.id)?.icon ?? "",
          color: ABOUT_IDS.find((x) => x.value === existing.id)?.color ?? "",
        },
      ]
    : ABOUT_IDS.filter((opt) => !usedIds.includes(opt.value)).map((opt) => ({
        value: opt.value,
        label: opt.label,
        icon: opt.icon ?? "",
        color: opt.color ?? "",
      }));

  const displayedIds = showAllIds ? availableIds : availableIds.slice(0, 6);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleIdSelect = (id: string) => {
    setForm({ ...form, id });
    if (errors.id) setErrors((prev) => ({ ...prev, id: "" }));
    setTouched((prev) => ({ ...prev, id: true }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldRules = aboutValidationRules[field];
    if (fieldRules) {
      const fieldError = validateField(
        form[field as keyof typeof form],
        fieldRules
      );
      setErrors((prev) => ({ ...prev, [field]: fieldError || "" }));
    }
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate entire form
    const validation = validateForm(form, aboutValidationRules);
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
      const url = existing ? `/api/about/${existing.id}` : "/api/about";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        addToast({
          type: "success",
          title: existing ? "About Diperbarui" : "About Ditambahkan",
          message: existing
            ? "Data berhasil diperbarui."
            : "Data baru berhasil ditambahkan.",
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menyimpan",
        message: "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={existing ? "Edit About" : "Tambah About"}
      subtitle={existing ? "Edit data about" : "Tambah data about baru"}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel={existing ? "Update About" : "Simpan About"}
      isSubmitting={isSubmitting}
      preview={<AboutPreview id={form.id} content={form.content} />}
    >
      {/* Custom ID Picker */}
      <AboutIdPicker
        ABOUT_IDS={ABOUT_IDS.map((opt) => ({
          value: opt.value,
          label: opt.label,
          icon: opt.icon ?? "",
          color: opt.color ?? "",
        }))}
        existing={existing}
        availableIds={availableIds}
        displayedIds={displayedIds}
        formId={form.id}
        errors={errors}
        touched={touched}
        showAllIds={showAllIds}
        setShowAllIds={setShowAllIds}
        handleIdSelect={handleIdSelect}
      />

      {/* Content */}
      <FormInput
        label="Konten"
        name="content"
        type="textarea"
        placeholder="Isi konten about sesuai bagian about yang dipilih"
        value={form.content}
        onChange={handleChange}
        onBlur={() => handleBlur("content")}
        required
        error={touched.content ? errors.content : ""}
        rows={5}
      />
    </FormLayout>
  );
}
