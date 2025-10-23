import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <Card className="bg-accent/50 backdrop-blur-sm border-accent-border px-8 py-6 animate-fadeIn" data-testid="card-countdown">
      <div className="flex gap-6 justify-center">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div 
              className="text-4xl md:text-5xl font-serif font-light text-primary mb-1"
              data-testid={`text-countdown-${unit.label.toLowerCase()}`}
            >
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {unit.label}
            </div>
            {index < timeUnits.length - 1 && (
              <div className="hidden md:block absolute h-8 w-px bg-primary/30" 
                   style={{ left: `${((index + 1) * 25) - 2}%` }} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
