"use client";

import { useState } from 'react';
import styles from './LogoAnim.module.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Logo({ size = 'md', animated = true }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  return (
    <div
      className={`${styles.container} ${sizeClasses[size]}`}
      onMouseEnter={() => animated && setHovered(true)}
      onMouseLeave={() => animated && setHovered(false)}
      aria-label="Leonid Petrov - Frontend Developer"
    >
      <span className={styles.bracketLeft}>{"<"}</span>
      <span className={`${styles.initials} ${hovered && styles.hover}`}>LP</span>
      <span className={styles.bracketRight}>{">"}</span>
      {animated && <span className={styles.cursor}>|</span>}
    </div>
  );
}
