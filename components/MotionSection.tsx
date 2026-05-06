"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionSection({
  children,
  className,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  /** Décompose les enfants directs en entrées successives (grille d’éléments). */
  stagger?: boolean;
}) {
  const systemReduce = useReducedMotion();

  if (systemReduce) {
    return <section className={className}>{children}</section>;
  }

  if (!stagger) {
    return (
      <motion.section
        className={className}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.55, ease }}
      >
        {children}
      </motion.section>
    );
  }

  const items = Children.toArray(children);

  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.48, ease },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
}
