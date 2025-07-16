import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Checkbox({ className = '', ...rest }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={`lg:w-[1.25rem] lg:h-[1.25rem] cursor-pointer border-2 border-dark-green rounded ${className}`}
      style={{ accentColor: '#2b3d19' }}
      {...rest}
    />
  );
}
