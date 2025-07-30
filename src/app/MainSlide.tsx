'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Image from 'next/image';
import CustomLink from '@/components/common/CustomLink';

export default function MainSlide() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Pagination, Autoplay]}
      loop={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      speed={1000}
      className="main-slide h-[42.5rem]"
    >
      <SwiperSlide className="relative video-slide">
        <div className="relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-cover"
          >
            <source src="/main-video-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:max-w-5xl">
          <h2 className="text-white font-bold lg:text-[2.75rem] lg:leading-[1.3]">
            흙내음 가득한 식탁,
            <br /> 오늘도 자연을 담다
          </h2>
          <p className="text-white lg:text-xl lg:mt-3">
            못난이 채소의 두 번째 기회가, 지구에게는 희망이 됩니다.
          </p>
          <div className="lg:mt-10">
            <CustomLink href="/about" variant="orange" size="xl">
              흙내음 이야기 보기
            </CustomLink>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-full">
          <Image
            src="/main-img-1.jpg"
            alt="메인 이미지1"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:max-w-5xl">
          <h2 className="font-bold lg:text-[2.75rem] lg:leading-[1.3]">
            농부의 손에서 당신의 식탁까지
          </h2>
          <p className="lg:text-xl lg:mt-3 lg:font-medium">
            함께하는 마음이 모여
            <br /> 못난이 채소에 생명을 불어넣습니다.
          </p>
          <div className="lg:mt-10">
            <CustomLink href="/shopping" variant="white" size="xl">
              장보러 가기
            </CustomLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
