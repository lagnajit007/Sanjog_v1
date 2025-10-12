import React from 'react';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, size = 100, strokeWidth = 10 }) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          stroke="hsl(var(--border))"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className="text-primary"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
