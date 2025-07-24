'use client';

import Image from 'next/image';

interface SingleCommentProps {
  comment: {
    _id: number;
    content: string;
    user: { _id: number; name: string; image?: string };
    createdAt: string;
  };
}

export default function Comment({ comment }: SingleCommentProps) {
  const profileSrc = comment.user?.image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${comment.user.image}`
    : '/imgs/recipe/recipe7.png';

  return (
    <div className="flex items-center py-5 border-b-2 border-[#DEDEDE]">
      <div className="relative lg:w-[3.125rem] lg:h-[3.125rem]">
        <Image
          src={profileSrc}
          alt={`${comment.user.name} 프로필 이미지`}
          fill
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="ml-[1.875rem]">
        <p className="font-semibold text-dark-green">
          {comment.user?.name ?? '익명'}
        </p>
        <p className="text-sm">{comment.content}</p>
      </div>
      {/* 필요하면 수정/삭제 버튼 추가 */}
    </div>
  );
}
