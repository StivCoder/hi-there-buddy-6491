import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
}

export const AnimatedSection = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}: AnimatedSectionProps) => {
  const directionVariants = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: 60, opacity: 0 },
    right: { x: -60, opacity: 0 },
    fade: { opacity: 0 }
  };

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ 
        y: 0, 
        x: 0, 
        opacity: 1,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedCard = ({ 
  children, 
  delay = 0,
  className = ''
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.95 }}
      whileInView={{ 
        y: 0, 
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxSection = ({ 
  children,
  offset = 50,
  className = ''
}: AnimatedSectionProps & { offset?: number }) => {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ 
        y: 0,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ 
  children,
  className = ''
}: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children,
  className = ''
}: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
