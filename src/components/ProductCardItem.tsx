'use client';

import { ProductType } from '@/types';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export default function ProductCardItem({ item }: { item: ProductType }) {
  return (
    <li>
      <Link href={`shopping/${item._id}`}>
        <div className="relative aspect-square">
          <Image
            src={`${API_URL}/${item.mainImages![0].path}`}
            alt={`${item.name} 이미지`}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative lg:mt-4 w-full">
          <div className="flex gap-2 w-full lg:pr-6">
            <h4 className="truncate lg:text-base">{item.name}</h4>
            <span className="text-gray lg:mt-[0.0625rem] lg:text-sm">
              {item.extra?.details}
            </span>
          </div>
          <strong className="inline-block text-orange lg:mt-1.5 lg:text-xl">
            {item.price?.toLocaleString()}원
          </strong>
          <button type="submit">
            <Heart strokeWidth={1} className="w-5 h-5" />
          </button>
        </div>
      </Link>
    </li>
  );
}
