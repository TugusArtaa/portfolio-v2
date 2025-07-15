import React, { useEffect, useState } from "react";
import ReviewFormModal from "./ReviewFormModal";
import { useToast } from "@/components/ui/toast";
import Lottie from "lottie-react";
import reviewAnimation from "../../../public/animations/Animation-Review.json";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface Review {
  id: string;
  name: string;
  origin: string;
  review: string;
  createdAt: string;
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/public/review");
      const data = await res.json();
      setReviews(data);
    } catch {
      addToast({
        type: "error",
        title: "Failed to load reviews",
        message: "Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewAdded = () => {
    setModalOpen(false);
    fetchReviews();
    addToast({
      type: "success",
      title: "Review submitted",
      message: "Thank you for your feedback!",
    });
  };

  useEffect(() => {
    // Animasi scroll untuk elemen di ReviewSection
    const isMobile = window.innerWidth < 768;
    const settings = {
      duration: isMobile ? 0.8 : 1.2,
      yOffset: isMobile ? 30 : 60,
      scale: isMobile ? 0.98 : 0.95,
      ease: "power2.out",
    };

    // Judul
    gsap.fromTo(
      "[data-review-title]",
      {
        opacity: 0,
        y: settings.yOffset,
        scale: settings.scale,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: settings.duration,
        ease: settings.ease,
        scrollTrigger: {
          trigger: "[data-review-title]",
          start: isMobile ? "top 90%" : "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
    // Deskripsi
    gsap.fromTo(
      "[data-review-desc]",
      {
        opacity: 0,
        y: settings.yOffset,
        scale: settings.scale,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: settings.duration,
        ease: settings.ease,
        scrollTrigger: {
          trigger: "[data-review-desc]",
          start: isMobile ? "top 90%" : "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
    // Tombol
    gsap.fromTo(
      "[data-review-btn]",
      {
        opacity: 0,
        y: settings.yOffset,
        scale: settings.scale,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: settings.duration * 0.8,
        ease: settings.ease,
        scrollTrigger: {
          trigger: "[data-review-btn]",
          start: isMobile ? "top 90%" : "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
    // InfiniteMovingCards
    gsap.fromTo(
      "[data-review-cards]",
      {
        opacity: 0,
        y: settings.yOffset,
        scale: settings.scale,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: settings.duration,
        ease: settings.ease,
        scrollTrigger: {
          trigger: "[data-review-cards]",
          start: isMobile ? "top 90%" : "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section className="py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Lottie Animation - Kiri */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[600px] xl:h-[600px]">
              <Lottie
                animationData={reviewAnimation}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          {/* Teks dan Button - Kanan */}
          <div className="w-full lg:w-1/2 text-left">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sky-900 dark:text-white text-left"
              data-review-title
            >
              What People Say?
            </h2>
            <p
              className="text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 text-left"
              data-review-desc
            >
              Read what others are saying about this website or about working
              with me.
            </p>
            <div>
              <button
                className="cursor-pointer inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-1 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
                onClick={() => setModalOpen(true)}
                data-review-btn
              >
                Add Review
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Infinite Moving Cards */}
        <div className="mt-2 mb-12" data-review-cards>
          {reviews.length === 0 ? (
            <div className="col-span-2 text-center text-slate-400 py-8">
              No reviews yet.
            </div>
          ) : (
            <InfiniteMovingCards reviews={reviews} />
          )}
        </div>
      </div>
      <ReviewFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleReviewAdded}
      />
    </section>
  );
};

export default ReviewSection;
