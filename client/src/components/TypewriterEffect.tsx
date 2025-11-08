import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

export function TypewriterEffect({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete,
  className = '',
  showCursor = true,
  cursorChar = '|'
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursorState(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Reset when text changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsComplete(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayedText}
      {showCursor && (!isComplete || showCursorState) && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-nyc-blue font-bold"
        >
          {cursorChar}
        </motion.span>
      )}
    </motion.div>
  );
}

// Multi-line typewriter for longer AI responses
interface MultilineTypewriterProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  className?: string;
  onComplete?: () => void;
}

export function MultilineTypewriter({
  lines,
  speed = 30,
  lineDelay = 800,
  className = '',
  onComplete
}: MultilineTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    setCompletedLines(prev => [...prev, lines[currentLineIndex]]);
    
    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, lineDelay);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className={className}>
      <AnimatePresence>
        {completedLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2"
          >
            {line}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {currentLineIndex < lines.length && (
        <TypewriterEffect
          text={lines[currentLineIndex]}
          speed={speed}
          onComplete={handleLineComplete}
          showCursor={currentLineIndex === lines.length - 1}
        />
      )}
    </div>
  );
}

// AI Thinking dots animation
export function AIThinking({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="text-sm text-gray-600">AI analyzing</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2
          }}
          className="w-1 h-1 bg-nyc-blue rounded-full"
        />
      ))}
    </div>
  );
}