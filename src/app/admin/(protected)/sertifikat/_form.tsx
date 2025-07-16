"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/Shared/FormLayout";
import FormInput from "@/components/Shared/FormInput";
import SertifikatPreview from "@/components/Shared/SertifikatPreview";
import ImageUpload from "@/components/Shared/ImageUpload";
import { useToast } from "@/components/UI/Toast";
import {
  validateForm,
  validateField,
  sertifikatValidationRules,
} from "@/lib/validation";
import { Certificate } from "@prisma/client";

interface SertifikatFormProps {
  existing?: Certificate;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function SertifikatForm({
  existing,
  onSuccess,
  onCancel,
}: SertifikatFormProps) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    issuer: "",
    issueDate: "",
    expireDate: "",
    image: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (existing) {
      setForm({
        id: existing.id || "",
        title: existing.title || "",
        issuer: existing.issuer || "",
        issueDate:
          existing.issueDate &&
          new Date(existing.issueDate).toISOString().slice(0, 10),
        expireDate: existing.expireDate
          ? new Date(existing.expireDate).toISOString().slice(0, 10)
          : "",
        image: existing.image || "",
      });
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
    const fieldRules = sertifikatValidationRules[field];
    if (fieldRules) {
      const fieldError = validateField(
        form[field as keyof typeof form],
        fieldRules
      );
      setErrors((prev) => ({ ...prev, [field]: fieldError || "" }));
    }
  };

  const handleImageChange = (url: string) => {
    setForm((prev) => ({ ...prev, image: url }));
    if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate entire form
    const validation = validateForm(form, sertifikatValidationRules);
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
      const url = existing
        ? `/api/sertifikat/${existing.id}`
        : "/api/sertifikat";
      const payload = {
        ...form,
        id: existing
          ? existing.id
          : form.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") +
            "-" +
            Math.random().toString(36).slice(2, 8),
        issueDate: form.issueDate,
        expireDate: form.expireDate || null,
        image: form.image || null,
      };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        addToast({
          type: "success",
          title: existing ? "Sertifikat Diperbarui" : "Sertifikat Ditambahkan",
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
      title={existing ? "Edit Sertifikat" : "Tambah Sertifikat"}
      subtitle={
        existing ? "Edit data sertifikat" : "Tambah data sertifikat baru"
      }
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel={existing ? "Update Sertifikat" : "Simpan Sertifikat"}
      isSubmitting={isSubmitting}
      preview={
        <SertifikatPreview
          title={form.title}
          issuer={form.issuer}
          issueDate={form.issueDate}
          expireDate={form.expireDate}
          image={form.image}
        />
      }
    >
      <FormInput
        label="Judul Sertifikat"
        name="title"
        placeholder="Contoh: Frontend Developer"
        value={form.title}
        onChange={handleChange}
        onBlur={() => handleBlur("title")}
        required
        error={touched.title ? errors.title : ""}
      />
      <FormInput
        label="Penerbit"
        name="issuer"
        placeholder="Contoh: Dicoding, Coursera"
        value={form.issuer}
        onChange={handleChange}
        onBlur={() => handleBlur("issuer")}
        required
        error={touched.issuer ? errors.issuer : ""}
      />
      <FormInput
        label="Tanggal Terbit"
        name="issueDate"
        type="date"
        placeholder="Tanggal terbit"
        value={form.issueDate}
        onChange={handleChange}
        onBlur={() => handleBlur("issueDate")}
        required
        error={touched.issueDate ? errors.issueDate : ""}
      />
      <FormInput
        label="Tanggal Expired (Opsional)"
        name="expireDate"
        type="date"
        placeholder="Tanggal expired (opsional)"
        value={form.expireDate}
        onChange={handleChange}
        onBlur={() => handleBlur("expireDate")}
        error={touched.expireDate ? errors.expireDate : ""}
      />
      <ImageUpload
        label="Gambar Sertifikat"
        value={form.image}
        onChange={handleImageChange}
        onPreviewChange={() => {}}
        error={touched.image ? errors.image : ""}
      />
    </FormLayout>
  );
}
