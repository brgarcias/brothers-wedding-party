"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: Readonly<CountdownTimerProps>) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = targetDate.getTime() - Date.now();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeUnits = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className="relative rounded-2xl mx-auto"
      animate={{
        boxShadow: [
          "0 0 0px 0px hsl(122 16% 55% / 0)",
          "8px 8px 20px -4px hsl(122 16% 55% / 0.25), -8px -8px 20px -4px hsl(122 16% 75% / 0.2)",
          "0 0 0px 0px hsl(122 16% 55% / 0)",
        ],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Card
        className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-4 sm:px-8 py-6 shadow-sm animate-fadeIn"
        data-testid="card-countdown"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="flex flex-col items-center relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={unit.value}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-light tracking-wide"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>

              <div className="mt-1 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-medium">
                {unit.label}
              </div>

              {index < timeUnits.length - 1 && (
                <span className="hidden md:block absolute right-[-20px] top-4 h-10 w-px bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
