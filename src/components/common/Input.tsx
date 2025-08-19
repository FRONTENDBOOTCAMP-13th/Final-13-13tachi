import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: 'lg' | 'md' | 'sm' | 'xs' | 'md2' | 'lg2' | 'md3';
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  width = 'md',
  className = '',
  readOnly = false,
  onChange,
  ...rest
}: InputProps & { readOnly?: boolean }) {
  const widthClasses = {
    lg: 'lg:w-[48.75rem] lg:h-[2.8125rem] h-[40px]',
    lg2: 'md:w-[20.625rem] w-full h-[250px] ',
    md3: 'md:w-[20.625rem] w-full lg:h-[2.8125rem] h-[40px]',
    md: 'lg:w-[20.625rem] md:w-[300px] w-[100px] lg:h-[2.8125rem] h-[40px]',
    md2: 'w-full lg:h-[2.8125rem] h-[40px]',
    sm: 'lg:w-[10.9375rem] lg:h-[2.8125rem] h-[40px]',
    xs: 'lg:w-[7.4375rem] w-[100px] lg:h-[2.8125rem] h-[40px]',
  };

  return (
    <input
      className={`${widthClasses[width]} px-3 text-sm placeholder:text-sm border border-light-gray rounded-lg text-black
        ${
          readOnly
            ? 'bg-gray-200 text-gray-500 cursor-default placeholder-disable-gray focus:outline-none'
            : 'bg-white focus:outline-gray'
        }
        ${className}`}
      onChange={onChange}
      readOnly={readOnly}
      {...rest}
    />
  );
}
