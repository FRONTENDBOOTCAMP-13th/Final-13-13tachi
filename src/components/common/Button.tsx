interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'white';
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxlsm';
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
    xxs: 'lg:w-[97px] lg:h-[25px] lg:text-xs',
    xs: 'lg:w-[65px] lg:h-[30px] lg:text-sm',
    sm: 'lg:w-[80px] lg:h-[30px] lg:text-sm',
    md: 'lg:w-[100px] lg:h-[40px] lg:text-base',
    lg: 'lg:w-[120px] lg:h-[30px] lg:text-sm',
    xl: 'lg:w-[180px] lg:h-[50px] lg:text-base',
    xxl: 'lg:w-[200px] lg:h-[48px] lg:text-base',
    xxlsm: 'lg:w-[100px] lg:h-[48px] lg:text-base',
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
