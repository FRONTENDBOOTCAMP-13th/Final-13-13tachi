import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  width = 'md',
  className = '',
  onChange,
  ...rest
}: InputProps) {
  const widthClasses = {
    lg: 'w-[780px]',
    md: 'w-[330px]',
    sm: 'w-[175px]',
    xs: 'w-[119px]',
  };

  return (
    <input
      className={`h-[45px] ${widthClasses[width]} px-3 text-sm border border-light-gray rounded-lg text-black placeholder-gray-400 focus:outline-gray  ${className}`}
      onChange={onChange}
      {...rest}
    />
  );
}
