"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

type Petal = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: string;
  rotation: number;
  shape: "round" | "elongated";
};

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${10 + Math.random() * 8}s`,
      size: Math.random() > 0.5 ? "w-3 h-3" : "w-2.5 h-2.5",
      opacity: Math.random() > 0.5 ? "opacity-20" : "opacity-10",
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? "round" : "elongated",
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(15px) rotate(180deg);
          }
          100% {
            transform: translateY(110vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute ${petal.size} ${petal.opacity}`}
          style={{
            left: petal.left,
            top: "-5%",
            animation: `fall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          {petal.shape === "round" ? (
            <Heart
              className="w-full h-full text-primary/30"
              fill="currentColor"
            />
          ) : (
            <div className="w-full h-full bg-primary/20 rounded-full rotate-45" />
          )}
        </div>
      ))}
    </div>
  );
}
