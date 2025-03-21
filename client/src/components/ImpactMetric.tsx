import { motion } from "framer-motion";

interface BeforeAfterProps {
  title: string;
  before: {
    value: number;
    label?: string;
  };
  after: {
    value: number;
    label?: string;
  };
  unit?: string;
  colors: {
    before: string;
    after: string;
  };
  formatFn?: (value: number) => string;
}

export function BeforeAfterBar({ 
  title, 
  before, 
  after, 
  unit = "%", 
  colors,
  formatFn = (value) => `${value}${unit}` 
}: BeforeAfterProps) {
  const percentChange = ((after.value - before.value) / before.value) * 100;
  const sign = percentChange >= 0 ? "+" : "";

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{title}</span>
        <div>
          <span className="text-xs">Before: </span>
          <span className="text-xs font-bold">{formatFn(before.value)}</span>
          {before.label && <span className="text-xs ml-1">{before.label}</span>}
        </div>
      </div>
      <div className="w-full h-3 bg-[#E9ECEF] rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${before.value}%` }}
          transition={{ duration: 0.5 }}
          className="h-3 rounded-full" 
          style={{ backgroundColor: colors.before }}
        ></motion.div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs">After: </span>
        <span className="text-xs font-bold">
          {formatFn(after.value)} {sign}{percentChange.toFixed(0)}%
        </span>
        {after.label && <span className="text-xs ml-1">{after.label}</span>}
      </div>
      <div className="w-full h-3 bg-[#E9ECEF] rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${after.value}%` }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-3 rounded-full" 
          style={{ backgroundColor: colors.after }}
        ></motion.div>
      </div>
    </div>
  );
}

interface GridMetricProps {
  value: number | string;
  label: string;
  color?: string;
}

export function GridMetric({ value, label, color = "#0A5796" }: GridMetricProps) {
  return (
    <div className="bg-white p-2 rounded-md">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-lg font-bold" 
        style={{ color }}
      >
        {typeof value === 'number' ? `+${value}%` : value}
      </motion.div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

interface BeforeAfterVisualizationProps {
  title: string;
  beforeValue: string;
  afterValue: string;
  beforeColor: string;
  afterColor: string;
}

export function BeforeAfterVisualization({
  title,
  beforeValue,
  afterValue,
  beforeColor,
  afterColor
}: BeforeAfterVisualizationProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <div className="bg-white rounded-md p-2 h-40 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br"
          style={{ 
            backgroundImage: `linear-gradient(to bottom right, ${beforeColor}, ${afterColor})`,
          }}
        ></motion.div>
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-1 rounded text-xs font-mono">
          {beforeValue}
        </div>
      </div>
    </div>
  );
}
