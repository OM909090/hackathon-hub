import { useState, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// YouTube-style shimmer skeleton box
export const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-lg bg-muted ${className}`}>
    <div className="absolute inset-0 skeleton-shimmer" />
  </div>
);

// Skeleton circle
export const SkeletonCircle = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-full bg-muted ${className}`}>
    <div className="absolute inset-0 skeleton-shimmer" />
  </div>
);

// Skeleton text line
export const SkeletonLine = ({ width = "100%", className = "" }: { width?: string; className?: string }) => (
  <div className={`relative overflow-hidden rounded bg-muted h-3 ${className}`} style={{ width }}>
    <div className="absolute inset-0 skeleton-shimmer" />
  </div>
);

// Page loader wrapper — shows skeleton, then fades to real content
interface PageLoaderProps {
  children: ReactNode;
  skeleton: ReactNode;
  delay?: number; // ms to show skeleton
}

export const PageLoader = ({ children, skeleton, delay = 600 }: PageLoaderProps) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [location.key, delay]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {skeleton}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
