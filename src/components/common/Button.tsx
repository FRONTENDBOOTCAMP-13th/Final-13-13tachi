interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export default function Button({
  children,
  variant = 'green',
  size = 'xl',
  ...rest
}: ButtonProps) {
  const baseStyle = 'font-semibold rounded-lg shadow-[var(--btn-shadow)]';

  const variantStyle = {
    green: 'bg-dark-green text-white',
    white: 'bg-disable-gray text-black border border-light-gray',
  };

  const sizeStyle = {
    xs: 'lg:w-[4.0625rem] lg:h-[1.875rem] lg:text-sm',
    sm: 'lg:w-[5rem] lg:h-[1.875rem] lg:text-sm',
    md: 'lg:w-[6.25rem] lg:h-[2.5rem] lg:text-base',
    lg: 'lg:w-[7.5rem] lg:h-[1.875rem] lg:text-sm',
    xl: 'lg:w-[11.25rem] lg:h-[3.125rem] lg:text-base',
    xxl: 'lg:w-[12.5rem] lg:h-[3rem] lg:text-base',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
