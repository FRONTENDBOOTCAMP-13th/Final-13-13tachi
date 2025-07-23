'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import Image from 'next/image';
import Link from 'next/link';

import './shopping.css';
import { Heart } from 'lucide-react';
import { ProductType } from '@/types';

interface AllItemsProps {
  products: ProductType[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HotItems({ products }: AllItemsProps) {
  const filteredItems = products.filter(item => item.extra?.isBest);

  const hotItemList = filteredItems.map((item, index) => {
    return (
      <SwiperSlide
        key={index}
        className="lg:rounded-[3rem] lg:shadow-[3px_4px_4px_rgb(0,0,0,0.25)]"
      >
        <Link
          href="#" //TODO 상품 상세페이지 경로 정해지면 추가
          className="flex flex-col items-center lg:gap-2.5 lg:py-5.5 lg:px-6"
        >
          <div className="relative w-full aspect-[18/17]">
            <Image
              src={`${API_URL}/${item.mainImages![0].path}`}
              alt={`${item.name} 이미지`}
              fill
              className="rounded-[1.875rem] object-cover"
            />
          </div>
          <div className="relative text-center w-full">
            <h4 className="relative block w-full lg:px-2.5 lg:text-base truncate">
              {item.name}
            </h4>
            <p className="text-gray lg:text-sm">{item.extra?.details}</p>
            <strong className="text-orange font-semibold inline-block lg:mt-1 lg:text-xl">
              {item.price?.toLocaleString()}원
            </strong>
            {/* TODO 내 찜목록은 filled로 보여지도록, 클릭하면 내 찜목록에 토글 되도록, 아이콘 filled와 토글 되도록, 로그인 안 되어 있을 경우에 클릭하면 로그인 페이지 안내 모달 나오도록 */}
            <button
              type="button"
              className="absolute top-[0.25rem] -right-1.5 cursor-pointer"
            >
              <Heart strokeWidth={1} className="w-4.5 h-4.5" />
            </button>
          </div>
        </Link>
      </SwiperSlide>
    );
  });

  return (
    <div className="lg:mt-4.5">
      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        autoHeight={true}
        loop={true}
        className="hotitem-slide"
      >
        {hotItemList}
      </Swiper>
    </div>
  );
}
