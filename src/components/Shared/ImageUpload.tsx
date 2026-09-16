"use client";

import React, { useState } from "react";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onPreviewChange: (url: string) => void;
  error?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  onPreviewChange,
  error,
}: ImageUploadProps) {
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
        onPreviewChange(data.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    onPreviewChange(url);
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {label}
      </label>

      {/* Upload Method Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setUploadMethod("upload")}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors duration-200 ${
            uploadMethod === "upload"
              ? "bg-black text-white"
              : "bg-zinc-100 text-zinc-600 border border-black/5"
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod("url")}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors duration-200 ${
            uploadMethod === "url"
              ? "bg-black text-white"
              : "bg-zinc-100 text-zinc-600 border border-black/5"
          }`}
        >
          URL
        </button>
      </div>

      {uploadMethod === "upload" ? (
        <div>
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
            <div className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:border-black transition-all duration-200 flex items-center justify-center gap-2 hover:bg-zinc-50">
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-black text-sm font-medium">
                    Uploading...
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-zinc-700 text-sm font-medium">
                    {value ? "Change Image" : "Upload Image"}
                  </span>
                </>
              )}
            </div>
          </label>
          <p className="text-xs text-zinc-500 mt-1">
            Supports JPG, PNG, JPEG up to 5MB
          </p>
        </div>
      ) : (
        <input
          name="coverImage"
          placeholder="https://example.com/image.jpg"
          value={value}
          onChange={handleUrlChange}
          className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 text-black placeholder-zinc-400"
        />
      )}
      {/* Tampilkan pesan error jika ada */}
      {error && (
        <p className="text-sm text-rose-600 flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
