import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ScenarioCardProps {
  id: number;
  name: string;
  description: string;
  unitCount: number;
  affordablePercentage: number;
  imageUrl: string;
  isActive: boolean;
  onClick: () => void;
}

export function ScenarioCard({
  id,
  name,
  description,
  unitCount,
  affordablePercentage,
  imageUrl,
  isActive,
  onClick
}: ScenarioCardProps) {
  // Determine unit badge color based on count
  const getBadgeColor = (units: number) => {
    if (units >= 75) return "bg-[#28A745]";
    if (units >= 50) return "bg-[#FFC107]";
    return "bg-[#FF6B00]";
  };

  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      className={cn(
        "bg-[#F8F9FA] rounded-lg p-4 cursor-pointer hover:shadow-md transition-all",
        isActive && "border-2 border-[#0A5796]"
      )}
      onClick={onClick}
    >
      <div className="h-40 bg-[#DEE2E6] rounded-md mb-3 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-heading font-bold text-md mb-1">{name}</h3>
      <p className="text-xs text-[#6C757D] mb-2">{description}</p>
      <div className="flex items-center">
        <span className={`text-xs font-semibold ${getBadgeColor(unitCount)} text-white px-2 py-1 rounded-full`}>
          {unitCount} units
        </span>
        <span className="text-xs ml-2">{affordablePercentage}% affordable</span>
      </div>
    </motion.div>
  );
}
