import { useState, useCallback } from "react";
import BlurText from "@/components/BlurText/BlurText";

const titles = ["Front-end Developer", "UI/UX Designer", "Graphic Designer"];

export default function AnimatedTitle() {
  const [index, setIndex] = useState(0);

  const handleAnimationComplete = useCallback(() => {
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 800);
  }, []);

  return (
    <BlurText
      key={titles[index]}
      text={titles[index]}
      delay={100}
      animateBy="letters"
      direction="bottom"
      onAnimationComplete={handleAnimationComplete}
      className="font-bold text-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-zinc-900"
    />
  );
}
