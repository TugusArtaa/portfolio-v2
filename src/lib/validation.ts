// Interface aturan validasi untuk setiap field
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

// Hasil validasi form
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Fungsi validasi satu field
export function validateField(
  value: string,
  rules: ValidationRule
): string | null {
  // Validasi required
  if (rules.required && (!value || value.trim() === "")) {
    return "Field ini wajib diisi";
  }

  // Lewati validasi lain jika field kosong & tidak required
  if (!value || value.trim() === "") {
    return null;
  }

  // Validasi panjang minimal
  if (rules.minLength && value.length < rules.minLength) {
    return `Minimal ${rules.minLength} karakter`;
  }

  // Validasi panjang maksimal
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maksimal ${rules.maxLength} karakter`;
  }

  // Validasi pola (regex)
  if (rules.pattern && !rules.pattern.test(value)) {
    return "Format tidak valid";
  }

  // Validasi custom
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}

// Fungsi validasi seluruh form
export function validateForm(
  formData: Record<string, string>,
  validationRules: Record<string, ValidationRule>
): ValidationResult {
  const errors: Record<string, string> = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const value = formData[fieldName] || "";
    const rules = validationRules[fieldName];
    const error = validateField(value, rules);

    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Aturan validasi untuk form Project
export const projectValidationRules: Record<string, ValidationRule> = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  slug: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    custom: (value: string) => {
      if (value.startsWith("-") || value.endsWith("-")) {
        return "Slug tidak boleh diawali atau diakhiri dengan tanda '-'";
      }
      if (/[^a-z0-9-]/.test(value)) {
        return "Slug hanya boleh berisi huruf kecil, angka, dan tanda '-'";
      }
      if (value.includes("--")) {
        return "Slug tidak boleh mengandung dua tanda '-' berurutan";
      }
      return null;
    },
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  techStack: {
    required: false,
    custom: (value: string) => {
      if (!value) return null;
      const techs = value
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      if (techs.length > 20) {
        return "Maksimal 20 teknologi yang boleh diinput";
      }
      if (techs.some((tech) => tech.length < 2)) {
        return "Setiap nama teknologi minimal 2 karakter";
      }
      if (techs.some((tech) => /[^a-zA-Z0-9 .+#-]/.test(tech))) {
        return "Nama teknologi hanya boleh berisi huruf, angka, spasi, titik, +, #, dan -";
      }
      return null;
    },
  },
  coverImage: {
    required: true,
    custom: (value: string) => {
      if (!value) return "Cover image wajib diisi";
      if (/\s/.test(value)) {
        return "URL gambar tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL gambar tidak boleh diawali atau diakhiri spasi";
      }
      // Local upload
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );
        if (!hasValidExtension) {
          return "File gambar harus berformat jpg, jpeg, png, gif, atau webp";
        }
        return null;
      }
      // External URL
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL gambar harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL gambar tidak valid";
      }
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );
      if (!hasValidExtension) {
        return "URL gambar harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }
      return null;
    },
    maxLength: 255,
  },
  image1: {
    required: false,
    maxLength: 255,
    custom: (value: string) => {
      if (!value) return null;
      if (/\s/.test(value)) {
        return "URL gambar tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL gambar tidak boleh diawali atau diakhiri spasi";
      }
      // Local upload
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );
        if (!hasValidExtension) {
          return "File gambar harus berformat jpg, jpeg, png, gif, atau webp";
        }
        return null;
      }
      // External URL
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL gambar harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL gambar tidak valid";
      }
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );
      if (!hasValidExtension) {
        return "URL gambar harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }
      return null;
    },
  },
  image2: {
    required: false,
    maxLength: 255,
    custom: (value: string) => {
      if (!value) return null;
      if (/\s/.test(value)) {
        return "URL gambar tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL gambar tidak boleh diawali atau diakhiri spasi";
      }
      // Local upload
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );
        if (!hasValidExtension) {
          return "File gambar harus berformat jpg, jpeg, png, gif, atau webp";
        }
        return null;
      }
      // External URL
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL gambar harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL gambar tidak valid";
      }
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );
      if (!hasValidExtension) {
        return "URL gambar harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }
      return null;
    },
  },
  image3: {
    required: false,
    maxLength: 255,
    custom: (value: string) => {
      if (!value) return null;
      if (/\s/.test(value)) {
        return "URL gambar tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL gambar tidak boleh diawali atau diakhiri spasi";
      }
      // Local upload
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );
        if (!hasValidExtension) {
          return "File gambar harus berformat jpg, jpeg, png, gif, atau webp";
        }
        return null;
      }
      // External URL
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL gambar harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL gambar tidak valid";
      }
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );
      if (!hasValidExtension) {
        return "URL gambar harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }
      return null;
    },
  },
  url: {
    required: false,
    custom: (value: string) => {
      if (!value) return null;
      if (/\s/.test(value)) {
        return "URL tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL tidak boleh diawali atau diakhiri spasi";
      }
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL tidak valid";
      }
      return null;
    },
    maxLength: 255,
  },
};

// Aturan validasi untuk form Skill
export const skillValidationRules: Record<string, ValidationRule> = {
  name: {
    required: true,
    maxLength: 50,
    minLength: 2,
    pattern: /^[\w .+#-]+$/,
    custom: (value: string) => {
      if (!/^[\w .+#-]+$/.test(value)) {
        return "Nama skill hanya boleh berisi huruf, angka, spasi, titik, +, #, dan -";
      }
      return null;
    },
  },
  level: {
    required: true,
    custom: (value: string) => {
      const allowed = ["Beginner", "Intermediate", "Advanced", "Expert"];
      if (!allowed.includes(value)) {
        return "Level skill tidak valid";
      }
      return null;
    },
  },
  icon: {
    required: true,
    maxLength: 255,
    custom: (value: string) => {
      if (!value) return "Icon skill wajib diisi";
      if (/\s/.test(value)) {
        return "URL icon tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL icon tidak boleh diawali atau diakhiri spasi";
      }
      // Local upload
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );
        if (!hasValidExtension) {
          return "File gambar harus berformat jpg, jpeg, png, gif, atau webp";
        }
        return null;
      }
      // External URL
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL gambar harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL gambar tidak valid";
      }
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );
      if (!hasValidExtension) {
        return "URL gambar harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }
      return null;
    },
  },
};

// Aturan validasi untuk form Tool
export const toolValidationRules: Record<string, ValidationRule> = {
  name: {
    required: true,
    maxLength: 50,
    minLength: 2,
    pattern: /^[\w .+#-]+$/,
    custom: (value: string) => {
      if (!/^[\w .+#-]+$/.test(value)) {
        return "Nama tool hanya boleh berisi huruf, angka, spasi, titik, +, #, dan -";
      }
      return null;
    },
  },
  level: {
    required: true,
    custom: (value: string) => {
      const allowed = ["Beginner", "Intermediate", "Advanced", "Expert"];
      if (!allowed.includes(value)) {
        return "Level tool tidak valid";
      }
      return null;
    },
  },
  icon: {
    required: true,
    maxLength: 255,
    custom: (value: string) => {
      if (!value) return "Icon tool wajib diisi";
      if (/\s/.test(value)) {
        return "URL icon tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL icon tidak boleh diawali atau diakhiri spasi";
      }
      // Local upload
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );
        if (!hasValidExtension) {
          return "File gambar harus berformat jpg, jpeg, png, gif, atau webp";
        }
        return null;
      }
      // External URL
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL gambar harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL gambar tidak valid";
      }
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );
      if (!hasValidExtension) {
        return "URL gambar harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }
      return null;
    },
  },
};

// Aturan validasi untuk form Sertifikat
export const sertifikatValidationRules: Record<string, ValidationRule> = {
  title: {
    required: true,
    maxLength: 100,
  },
  issuer: {
    required: true,
    maxLength: 100,
  },
  issueDate: {
    required: true,
    custom: (value: string) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return "Format tanggal tidak valid";
      }
      return null;
    },
  },
  expireDate: {
    required: false,
    custom: (value: string) => {
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return "Format tanggal tidak valid";
      }
      return null;
    },
  },
  image: {
    required: true,
    maxLength: 255,
    custom: (value: string) => {
      if (!value) return "Gambar sertifikat wajib diisi";
      if (/\s/.test(value)) {
        return "URL gambar tidak boleh mengandung spasi";
      }
      if (value !== value.trim()) {
        return "URL gambar tidak boleh diawali atau diakhiri spasi";
      }
      // Local upload
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );
        if (!hasValidExtension) {
          return "File gambar harus berformat jpg, jpeg, png, gif, atau webp";
        }
        return null;
      }
      // External URL
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL gambar harus diawali dengan http:// atau https://";
        }
      } catch {
        return "Format URL gambar tidak valid";
      }
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );
      if (!hasValidExtension) {
        return "URL gambar harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }
      return null;
    },
  },
};

// Aturan validasi untuk form About
export const aboutValidationRules: Record<string, ValidationRule> = {
  id: {
    required: true,
    custom: (value: string) => {
      const allowed = [
        "who_am_i",
        "education",
        "quote",
        "whatsapp",
        "gmail",
        "instagram",
        "github",
        "linkedin",
        "discord",
        "call_to_action",
      ];
      if (!allowed.includes(value)) {
        return "Bagian about tidak valid";
      }
      return null;
    },
  },
  content: {
    required: true,
    minLength: 2,
    maxLength: 1000,
    custom: (value: string) => {
      if (!value.trim()) {
        return "Konten wajib diisi";
      }
      if (value.length > 1000) {
        return "Konten maksimal 1000 karakter";
      }
      if (value.length < 2) {
        return "Konten minimal 2 karakter";
      }
      return null;
    },
  },
};

// Fungsi validasi form login
export function validateLoginForm(email: string, password: string): string {
  if (!email.trim()) {
    return "Email wajib diisi";
  }
  if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
    return "Format email tidak valid";
  }
  if (!password) {
    return "Password wajib diisi";
  }
  if (password.length < 6) {
    return "Password minimal 6 karakter";
  }
  return "";
}
