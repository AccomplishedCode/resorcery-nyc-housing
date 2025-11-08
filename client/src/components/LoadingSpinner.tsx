import { motion } from 'framer-motion';
import { Building, Zap, Users, TreePine } from 'lucide-react';
import { nycColors } from '@/lib/nyc-design-system';

interface LoadingSpinnerProps {
  message?: string;
  type?: 'default' | 'analysis' | 'data' | 'building';
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ 
  message = 'Loading...', 
  type = 'default',
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const getLoadingIcon = () => {
    switch (type) {
      case 'analysis':
        return <Zap className={`${sizeClasses[size]} text-purple-600`} />;
      case 'data':
        return <Users className={`${sizeClasses[size]} text-blue-600`} />;
      case 'building':
        return <Building className={`${sizeClasses[size]} text-green-600`} />;
      default:
        return <TreePine className={`${sizeClasses[size]} text-nyc-blue`} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.5, repeat: Infinity }
        }}
        className="mb-4"
      >
        {getLoadingIcon()}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="text-lg font-semibold text-gray-700 mb-2">{message}</div>
        
        {/* NYC-themed loading dots */}
        <div className="flex justify-center items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: nycColors.primary.blue }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger animation for lists
export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = ''
}: { 
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Success checkmark animation
export function SuccessCheckmark({ size = 24, color = nycColors.secondary.green }: { size?: number; color?: string }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M9 12l2 2 4-4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.svg>
    </motion.div>
  );
}

// Number counter animation
export function AnimatedCounter({ 
  value, 
  duration = 1,
  prefix = '',
  suffix = '',
  className = ''
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration }}
        >
          {value.toLocaleString()}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
}