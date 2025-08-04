'use client';

import Image from 'next/image';

interface ProfileProps {
  username: string;
  imageUrl?: string | null;
}

export default function Profile({ username, imageUrl }: ProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center lg:mt-[-4rem] md:mt-[-3rem] mt-[-2.5rem] relative">
      <div className="lg:w-[7.5rem] lg:h-[7.5rem] md:w-[6rem] md:h-[6rem] w-[5rem] h-[5rem] overflow-hidden rounded-full ring-4 ring-white relative">
        <Image
          src={imageUrl ? `${imageUrl}` : '/profile.svg'}
          alt={`${username} 프로필 이미지`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 5rem, (max-width: 1024px) 6rem, 7.5rem"
          priority
        />
      </div>
      <span className="lg:mt-[0.625rem] md:mt-2 mt-1.5 lg:text-xl md:text-lg text-base font-semibold">
        {username ?? '익명'}
      </span>
    </div>
  );
}
