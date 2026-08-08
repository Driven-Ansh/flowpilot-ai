import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes, resolving conflicts intelligently.
 * This is the standard shadcn/ui utility function.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupees (INR - ₹)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format currency in Indian Compact Lakhs / Crores notation (e.g. ₹8.5L, ₹1.2Cr)
 */
export function formatCompactINR(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} Lakhs`;
  }
  return formatCurrency(value);
}

/**
 * Format a number with Indian thousands separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Get a color based on a score 0-100
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // amber
  return '#f43f5e'; // red
}

/**
 * Get a background class based on risk level
 */
export function getRiskColor(level: string): string {
  switch (level.toLowerCase()) {
    case 'very low': return '#10b981';
    case 'low': return '#22d3ee';
    case 'medium': return '#f59e0b';
    case 'high': return '#f43f5e';
    default: return '#94a3b8';
  }
}

/**
 * Truncate text to a max length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generate a gradient based on an index (for charts/cards)
 */
export function getGradient(index: number): string {
  const gradients = [
    'from-indigo-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-cyan-500 to-emerald-400',
    'from-amber-500 to-orange-400',
    'from-rose-500 to-pink-400',
  ];
  return gradients[index % gradients.length];
}
