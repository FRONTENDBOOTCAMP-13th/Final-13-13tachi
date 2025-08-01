'use client';

import Image from 'next/image';

interface ProfileProps {
  username: string;
  imageUrl?: string | null;
}

export default function Profile({ username, imageUrl }: ProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-[-4rem] relative z-10">
      <div className="lg:w-[7.5rem] lg:h-[7.5rem] overflow-hidden rounded-full ring-4 ring-white">
        <Image
          src={imageUrl ? `${imageUrl}` : '/images/front-end.png'}
          alt={`${username} 프로필 이미지`}
          width={120}
          height={120}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <span className="mt-[0.625rem] text-xl font-semibold">
        {username ?? '익명'}
      </span>
    </div>
  );
}
