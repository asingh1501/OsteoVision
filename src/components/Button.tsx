import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ children, variant = 'primary', className = '', ...props }: Props) {
  const styles = {
    primary: 'bg-navy text-white shadow-sm hover:bg-[#18345f]',
    secondary: 'bg-white text-navy border border-slate-300 hover:border-slate-400 hover:bg-slate-50',
    ghost: 'text-navy hover:bg-slate-100',
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
