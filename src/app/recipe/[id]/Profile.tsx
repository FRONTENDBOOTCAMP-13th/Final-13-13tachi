'use client';
import useUserStore from '@/zustand/useStore';
import Image from 'next/image';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Profile({ username }: { username: string }) {
  const { user } = useUserStore();
  return (
    <div className="flex flex-col items-center justify-center mt-[-4rem] relative z-10">
      <div className="lg:w-[7.5rem] lg:h-[7.5rem] overflow-hidden rounded-full ring-4 ring-white">
        <Image
          src={
            user?.image ? `${API_URL}/${user.image}` : '/images/front-end.png'
          }
          alt={username ?? '작성자'}
          width={120}
          height={120}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="mt-[0.625rem] text-xl font-semibold">
        {username ?? '익명'}
      </span>
    </div>
  );
}
