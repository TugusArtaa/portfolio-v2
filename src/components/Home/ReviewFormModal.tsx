import React, { useState } from "react";
import { useToast, playNotificationSound } from "@/components/UI/Toast";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/UI/StatefulButton";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const initialState = { name: "", origin: "", review: "" };

// Komponen Input
function FancyInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const radius = 100;
  const [visible, setVisible] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${
              visible ? radius + "px" : "0px"
            } circle at ${mouseX}px ${mouseY}px,
            #71717a,
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <input
        {...props}
        className={`shadow-input flex h-10 w-full rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-900 transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:ring-[2px] focus-visible:ring-zinc-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
          props.className
            ? props.className
            : "border-zinc-200"
        }`}
      />
    </motion.div>
  );
}

// Komponen Textarea
function FancyTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const radius = 100;
  const [visible, setVisible] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${
              visible ? radius + "px" : "0px"
            } circle at ${mouseX}px ${mouseY}px,
            #71717a,
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <textarea
        {...props}
        className={`shadow-input flex w-full rounded-md border bg-zinc-50 px-3 py-2 text-sm text-zinc-900 transition duration-400 group-hover/input:shadow-none placeholder:text-zinc-400 focus-visible:ring-[2px] focus-visible:ring-zinc-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
          props.className
            ? props.className
            : "border-zinc-200"
        }`}
      />
    </motion.div>
  );
}

const ReviewFormModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToast();

  if (!open) return null;

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.origin.trim()) errs.origin = "Origin is required.";
    if (!form.review.trim()) errs.review = "Review is required.";
    else if (form.review.length < 10)
      errs.review = "Review must be at least 10 characters.";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      playNotificationSound("error");
      return;
    }
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/public/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setForm(initialState);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      onSuccess();
    } catch {
      playNotificationSound("error");
      addToast({
        type: "error",
        title: "Failed to submit review",
        message: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-lg mx-4 p-0 relative flex flex-col">
        {/* Header Section */}
        <div className="flex items-center gap-3 px-4 sm:px-8 pt-8 pb-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-zinc-900 mb-1 tracking-tight">
              Add Review
            </h3>
            <p className="text-zinc-500 text-sm">
              Share your experience with us!
            </p>
          </div>
        </div>
        <div className="border-b border-zinc-100 mx-4 sm:mx-8"></div>
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="cursor-pointer p-2 hover:bg-zinc-100 rounded-full transition-all duration-200 group absolute top-4 right-4"
        >
          <svg
            className="w-5 h-5 text-zinc-600 group-hover:rotate-90 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4 px-4 sm:px-8 py-8">
          <div>
            <label className="block text-sm font-semibold mb-1 text-zinc-700">
              Name <span className="text-red-500">*</span>
            </label>
            <FancyInput
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              placeholder="Your name"
              autoComplete="off"
              className={errors.name ? "ring-2 ring-red-400" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-zinc-700">
              Origin <span className="text-red-500">*</span>
            </label>
            <FancyInput
              name="origin"
              value={form.origin}
              onChange={handleChange}
              disabled={loading}
              placeholder="Where are you from?"
              autoComplete="off"
              className={errors.origin ? "ring-2 ring-red-400" : ""}
            />
            {errors.origin && (
              <p className="text-xs text-red-500 mt-1">{errors.origin}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-zinc-700">
              Review <span className="text-red-500">*</span>
            </label>
            <FancyTextarea
              name="review"
              value={form.review}
              onChange={handleChange}
              rows={4}
              disabled={loading}
              placeholder="Share your experience..."
              className={errors.review ? "ring-2 ring-red-400" : ""}
            />
            {errors.review && (
              <p className="text-xs text-red-500 mt-1">{errors.review}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              loading={loading}
              success={success}
              disabled={loading}
              className="mt-4 px-6"
            >
              {loading
                ? "Submitting..."
                : success
                ? "Success!"
                : "Submit Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;
