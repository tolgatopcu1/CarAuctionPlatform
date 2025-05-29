import React, { useEffect, useState } from "react";

interface CircleProps {
  startTime: string;
  endTime: string;
}

const Circle: React.FC<CircleProps> = ({ startTime, endTime }) => {
  const [percentage, setPercentage] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const update = () => {
      const now = Date.now();
      const total = end - start;
      const remaining = end - now;

      const pct = Math.max(0, Math.min(1, (now - start) / total));
      setPercentage(pct * 100);

      const secondsLeft = Math.max(0, Math.floor(remaining / 1000));
      const days = Math.floor(secondsLeft / (3600 * 24));
      const hours = Math.floor((secondsLeft % (3600 * 24)) / 3600);

      setTimeLeft(`${days}g ${hours}s`);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const radius = 18;
  const stroke = 3;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-xs">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#6366F1"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="text-gray-500 dark:text-gray-300 mt-1">{timeLeft}</span>
    </div>
  );
};

export default Circle;
