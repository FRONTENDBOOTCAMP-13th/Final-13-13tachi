'use client';

import useUserStore from '@/zustand/useStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'white';
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxlsm';
  type?: 'button' | 'submit';
  ownerId?: number; // 특정 사용자에게만 노출할 경우 사용
}

export default function Button({
  children,
  variant = 'green',
  size = 'xl',
  ownerId,
  ...rest
}: ButtonProps) {
  const baseStyle = 'font-semibold rounded-lg shadow-[var(--btn-shadow)]';

  const variantStyle = {
    green: 'bg-dark-green text-white hover:bg-hover-green',
    white: 'bg-bg-gray text-black border border-light-gray hover:bg-hover-gray',
  };
  const { user } = useUserStore(); // 로그인 사용자 정보 가져오기
  // ownerId가 전달될 때만 현재 로그인 사용자가 owner가 아니면 버튼 미노출
  if (ownerId && user?._id !== ownerId) return null;

  const sizeStyle = {
    xxs: 'h-[1.5625rem] w-36 md:w-[6.0625rem] md:h-[25px] lg:w-[97px] lg:h-[25px] text-xs',
    xs: 'lg:w-[65px] lg:h-[30px] lg:text-sm',
    sm: 'w-[68px] h-[28px] md:w-[80px] md:h-[30px] lg:w-[80px] lg:h-[30px] lg:text-sm',
    md: 'w-[60px] h-[28px] md:w-[80px] md:h-[32px] lg:w-[100px] lg:h-[40px] lg:text-base md:text-sm text-xs',
    lg: 'w-[100px] h-[30px] md:w-[120px] md:h-[30px] lg:w-[120px] lg:h-[30px] lg:text-sm md:text-sm text-xs',
    xl: 'w-[100px] h-[36px] md:w-[140px] md:h-[44px] lg:w-[180px] lg:h-[50px] lg:text-base md:text-sm text-xs',
    xxl: 'w-[110px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[200px] lg:h-[48px] lg:text-base text-sm',
    xxlsm: 'lg:w-[100px] lg:h-[48px] lg:text-base',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
}
