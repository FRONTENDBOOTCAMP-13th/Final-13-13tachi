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
    lg: 'lg:w-[48.75rem]',
    md: 'lg:w-[20.625rem]',
    sm: 'lg:w-[10.9375rem]',
    xs: 'lg:w-[ 7.4375rem ]',
  };

  return (
    <input
      className={`lg:h-[2.8125rem] ${widthClasses[width]} lg:px-3 lg:text-sm lg:placeholder:text-sm placeholder-gray border bg-white border-light-gray rounded-lg text-black   focus:outline-gray  ${className}`}
      onChange={onChange}
      {...rest}
    />
  );
}
