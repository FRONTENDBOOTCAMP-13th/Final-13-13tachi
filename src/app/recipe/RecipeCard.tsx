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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.slice(0, 4).map(item => (
        <Link
          key={item._id}
          href={`/recipe/${item._id}`}
          className="w-[15rem] block mt-[25px]"
        >
          <figure className="lg:w-[15rem]">
            <div className="relative w-[15rem] h-[15rem] overflow-hidden rounded-lg bg-gray-100">
              {item.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 15rem"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  이미지 없음
                </div>
              )}
            </div>
            <figcaption className="mt-[12px]">
              <div className="relative flex">
                <span className="text-xl font-semibold max-w-[90%] truncate">
                  {item.title}
                </span>
                <Bookmark
                  className={`absolute right-0 top-1 cursor-pointer ${
                    likeMap.has(item._id)
                      ? 'fill-black text-black'
                      : 'text-black'
                  }`}
                  strokeWidth={1}
                  onClick={e => {
                    e.preventDefault();
                    toggleBookmark(item._id);
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange text-sm truncate">
                  {item.tag
                    ? item.tag
                        .split(',')
                        .map(tag => tag.trim())
                        .join(' | ')
                    : '재료 없음'}
                </span>
                <span className="text-gray text-sm truncate">
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
