import React from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max, label, unit, color }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-gray-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-white">{Math.round(value)}</span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
      <span className="mt-2 text-lg font-semibold text-gray-300">{label}</span>
    </div>
  );
};

export default CircularProgress;
