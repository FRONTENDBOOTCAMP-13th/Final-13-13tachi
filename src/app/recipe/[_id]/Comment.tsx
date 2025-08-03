'use client';

import Image from 'next/image';
import { PostReply } from '@/types/post';
import CommentActionButton from '@/app/recipe/[_id]/CommentActionButton';

export default function Comment({ reply }: { reply: PostReply }) {
  return (
    <div className="flex items-start py-5 border-b-2 border-[#DEDEDE]">
      <div className="relative w-[3.125rem] h-[3.125rem] shrink-0">
        {reply.user.image ? (
          <Image
            src={reply.user?.image}
            alt={`${reply.user.name} 프로필 이미지`}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src={'/profile.svg'}
            alt={`${reply.user.name} 프로필 이미지`}
            fill
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="ml-4 w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-dark-green mb-1">
            {reply.user.name}
          </p>
          <CommentActionButton reply={reply} />
        </div>
        <p className="text-sm">{reply.content}</p>
      </div>
    </div>
  );
}
