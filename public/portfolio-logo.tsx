"use client";

import { useState } from 'react';
import styles from './LogoAnim.module.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCursor?: boolean;
}

export default function Logo({ size = 'md', showCursor = true }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  
  const sizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };
  
  return (
    <div
      className={`${styles.container} ${sizeMap[size]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Leonid Petrov - Frontend Developer"
      role="img"
    >
      <span className={styles.bracketLeft}>{"<"}</span>
      <span className={`${styles.initials} ${hovered ? styles.hover : ''}`}>
        <span className={styles.L}>L</span>
        <span className={styles.P}>P</span>
      </span>
      <span className={styles.bracketRight}>{">"}</span>
      {showCursor && <span className={styles.cursor}>|</span>}
    </div>
  );
}
