'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import Image from 'next/image';
import Link from 'next/link';

import './shopping.css';
import { Heart } from 'lucide-react';

interface HotItems {
  title: string;
  details: string;
  price: string;
  img: string;
}

const shoppingArr: HotItems[] = [
  {
    title: '감쟈합니다',
    details: '1kg',
    price: '3,250원',
    img: '/assets/shopping/items1.png',
  },
  {
    title: '바니바니바니바니 당근당근',
    details: '2개',
    price: '1,800원',
    img: '/assets/shopping/items2.png',
  },
  {
    title: '길쭉이 오이',
    details: '52개',
    price: '5,252원',
    img: '/assets/shopping/items3.png',
  },
  {
    title: '구 양배추 현 조세호',
    details: '1개',
    price: '1,840원',
    img: '/assets/shopping/items4.png',
  },
  {
    title: '단호하게 단호박',
    details: '1개',
    price: '2,100원',
    img: '/assets/shopping/items5.png',
  },
  {
    title: 'bro콜리',
    details: '200g',
    price: '1,500원',
    img: '/assets/shopping/items6.png',
  },
  {
    title: '토맛 토마토',
    details: '400g',
    price: '3,400원',
    img: '/assets/shopping/items7.png',
  },
];

export default function HotItems() {
  const hotItemList = shoppingArr.map((item, index) => {
    return (
      <SwiperSlide
        key={index}
        className="lg:rounded-[3rem] lg:shadow-[3px_4px_4px_rgb(0,0,0,0.25)]"
      >
        <Link
          href="#" //TODO 상품 상세페이지 경로 정해지면 추가
          className="flex flex-col items-center lg:gap-2.5 lg:py-5.5 lg:px-6"
        >
          <Image
            src={`${item.img}`}
            alt={`${item.title} 이미지`}
            width={182}
            height={170}
            className="rounded-[1.875rem]"
          />
          <div className="relative text-center w-full">
            <h4 className="relative block w-full lg:px-2.5 lg:text-base truncate">
              {item.title}
            </h4>
            <p className="text-gray lg:text-sm">{item.details}</p>
            <strong className="text-orange font-semibold inline-block lg:mt-1 lg:text-xl">
              {item.price}
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
