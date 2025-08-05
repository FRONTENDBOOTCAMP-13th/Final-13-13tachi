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
      className="main-slide max-h-full h-[31.25rem] md:h-[42.5rem]"
    >
      <SwiperSlide className="video-slide">
        <div className="relative w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/poster.jpg"
          >
            <source src="/main-video-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="w-full max-w-[calc(100%-40px)] absolute top-1/2 left-5 -translate-y-1/2 md:left-7.5 md:max-w-[calc(100%-60px)]  lg:max-w-5xl lg:left-1/2 lg:-translate-x-1/2">
          <h2 className="text-white font-bold leading-[1.3] text-4xl md:text-[2.25rem] lg:text-[2.75rem]">
            흙내음 가득한 식탁,
            <br /> 오늘도 자연을 담다
          </h2>
          <p className="mt-3 text-white text-base md:text-lg lg:text-xl">
            못난이 채소의 두 번째 기회가,
            <br className="md:hidden" /> 지구에게는 희망이 됩니다.
          </p>
          <div className="mt-10">
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
            alt="알감자들이 농부의 손에 담겨있는 이미지"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full max-w-[calc(100%-40px)] absolute top-1/2 left-5 -translate-y-1/2 md:left-7.5 md:max-w-[calc(100%-60px)] lg:max-w-5xl lg:left-1/2 lg:-translate-x-1/2">
          <h2 className="text-black font-bold leading-[1.3] text-4xl md:text-[2.25rem] lg:text-[2.75rem]">
            농부의 손에서 당신의 식탁까지
          </h2>
          <p className="mt-3 text-black text-base md:text-lg lg:text-xl">
            함께하는 마음이 모여
            <br /> 못난이 채소에 생명을 불어넣습니다.
          </p>
          <div className="mt-10">
            <CustomLink href="/shopping" variant="white" size="xl">
              장보러 가기
            </CustomLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
