import { Heart } from "lucide-react";

export function FloatingPetals() {
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: i % 3 === 0 ? "float" : i % 3 === 1 ? "float-slow" : "float-slower",
    size: Math.random() > 0.5 ? "w-3 h-3" : "w-2 h-2",
    opacity: Math.random() > 0.5 ? "opacity-20" : "opacity-10",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute ${petal.size} ${petal.opacity}`}
          style={{
            left: petal.left,
            top: `${Math.random() * 100}%`,
            animationDelay: petal.delay,
          }}
        >
          <Heart
            className={`w-full h-full text-primary animate-${petal.duration}`}
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
}
