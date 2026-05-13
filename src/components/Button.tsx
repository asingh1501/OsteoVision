import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ children, variant = 'primary', className = '', ...props }: Props) {
  const styles = {
    primary: 'bg-gradient-to-r from-violet to-magenta text-white shadow-lg shadow-fuchsia-500/20 hover:-translate-y-0.5',
    secondary: 'bg-white text-navy border border-violet/15 hover:border-violet/40 hover:bg-lavender',
    ghost: 'text-navy hover:bg-lavender',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
