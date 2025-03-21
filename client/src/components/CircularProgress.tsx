import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function CircularProgress({
  percentage,
  size = 100,
  strokeWidth = 10,
  color = "#28A745",
  label
}: CircularProgressProps) {
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E9ECEF"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
        />
        
        {/* Percentage text */}
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="text-xs font-mono"
        >
          {percentage}%
        </text>
      </svg>
      
      {label && (
        <div className="text-center text-xs mt-2">
          <span className="font-semibold">After: {percentage + 2}%</span>
          <span className="text-[#6C757D]">(+2%)</span>
        </div>
      )}
    </div>
  );
}
