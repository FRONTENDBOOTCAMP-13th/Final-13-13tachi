'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { Post } from '@/types/post';
import useBookmarkStore from '@/zustand/useBookmarkStore';

interface RecipeCardProps {
  posts: Post[];
  toggleBookmark: (postId: number) => void;
}

export default function RecipeCard({ posts, toggleBookmark }: RecipeCardProps) {
  const { likeMap } = useBookmarkStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[25px]">
      {' '}
      {/* mt를 컨테이너로 이동 */}
      {posts.slice(0, 4).map(item => (
        <Link
          key={item._id}
          href={`/recipe/${item._id}`}
          className="w-full block"
        >
          <figure className="w-full">
            {' '}
            {/* lg:w-[15rem] 제거하고 w-full 적용 */}
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
              {' '}
              {/* 고정 크기 제거하고 aspect-square 적용 */}
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 select-none">
                  이미지 없음
                </div>
              )}
            </div>
            <figcaption className="mt-3">
              {' '}
              {/* mt-[12px]를 mt-3으로 변경 */}
              <div className="relative flex">
                <span className="w-full pr-5.5 text-lg font-semibold truncate md:text-xl md:pr-6">
                  {item.title}asdf
                </span>
                <Bookmark
                  className={`absolute right-0 md:top-1 cursor-pointer w-[1.25rem] top-0 md:w-[1.5rem] ${
                    likeMap.has(item._id)
                      ? 'fill-black text-black'
                      : 'text-black'
                  }`}
                  strokeWidth={1}
                  onClick={e => {
                    e.preventDefault();
                    toggleBookmark(item._id);
                  }}
                  aria-label={
                    likeMap.has(item._id) ? '북마크 해제' : '북마크 추가'
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleBookmark(item._id);
                    }
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange text-xs md:text-sm truncate">
                  {item.tag
                    ? item.tag
                        .split(',')
                        .map(tag => tag.trim())
                        .join(' | ')
                    : '재료 없음'}
                </span>
                <span className="text-gray text-xs md:text-sm truncate">
                  {item.user.name}
                </span>
              </div>
            </figcaption>
          </figure>
        </Link>
      ))}
    </div>
  );
}
