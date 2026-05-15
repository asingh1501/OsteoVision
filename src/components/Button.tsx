import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ children, variant = 'primary', className = '', ...props }: Props) {
  const styles = {
    primary: 'bg-violet text-white shadow-sm hover:bg-[#5b21b6]',
    secondary: 'bg-white text-navy border border-slate-300 hover:border-violet hover:bg-lavender',
    ghost: 'text-navy hover:bg-lavender',
  };

  return (
    <button
      className={`focus-ring inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-base font-bold leading-6 transition disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0 [&_svg]:stroke-[2.25] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
