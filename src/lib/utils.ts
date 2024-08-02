import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T>(fn: (...args: T[]) => void, duration: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: T[]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), duration);
  };
}
