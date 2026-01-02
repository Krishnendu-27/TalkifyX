import { motion } from "motion/react";

export const FloatingElement = ({ children, delay, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};
