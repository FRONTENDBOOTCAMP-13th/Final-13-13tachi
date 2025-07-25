'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import Image from 'next/image';
import CustomLink from '@/components/common/CustomLink';

export default function ValueSlide() {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={3}
      centeredSlides={true}
      loop={true}
      speed={1000}
      className="value-slide relative lg:max-w-5xl"
    >
      <SwiperSlide className="!flex flex-col items-center lg:gap-6">
        <div className="relative w-[250px] aspect-square">
          <Image
            src="/value-slide-1.png"
            alt="2,180kg의 못난이 채소 구출 이미지"
            fill
            className="object-cover"
          ></Image>
        </div>
        <div className="text-center">
          <strong className="font-semibold text-dark-green lg:text-2xl">
            2,180kg의 못난이 채소 구출
          </strong>
          <p className="lg:mt-2">
            우리는 버려질 뻔한 채소에 생명을 불어넣었어요.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!flex flex-col items-center lg:gap-6">
        <div className="relative w-[250px] aspect-square">
          <Image
            src="/value-slide-2.png"
            alt="4.2톤 CO₂ 절감 이미지"
            fill
            className="object-cover"
          ></Image>
        </div>
        <div className="text-center">
          <strong className="font-semibold text-dark-green  lg:text-xl">
            4.2톤 CO₂ 절감
          </strong>
          <p className="lg:mt-2">
            우리는 유통과 폐기를 줄여 지구에 숨을 쉬게 했어요.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!flex flex-col items-center lg:gap-6">
        <div className="relative w-[250px] aspect-square">
          <Image
            src="/value-slide-3.png"
            alt="36 농가 참여 이미지"
            fill
            className="object-cover"
          ></Image>
        </div>
        <div className="text-center">
          <strong className="font-semibold text-dark-green  lg:text-xl">
            36 농가 참여
          </strong>
          <p className="lg:mt-2">더 많은 농민들이 우리와 함께하고 있어요.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!flex flex-col items-center lg:gap-6">
        <div className="relative w-[250px] aspect-square">
          <Image
            src="/value-slide-4.png"
            alt="1,570톤 물 절약 이미지"
            fill
            className="object-cover"
          ></Image>
        </div>
        <div className="text-center">
          <strong className="font-semibold text-dark-green  lg:text-xl">
            1,570톤 물 절약
          </strong>
          <p className="lg:mt-2">
            우리는 채소 한 개당 수십 리터의 물을 아꼈어요.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!flex flex-col items-center lg:gap-6">
        <div className="relative w-[250px] aspect-square">
          <Image
            src="/value-slide-5.png"
            alt="100% 재활용 포장 사용 이미지"
            fill
            className="object-cover"
          ></Image>
        </div>
        <div className="text-center">
          <strong className="font-semibold text-dark-green  lg:text-xl">
            100% 재활용 포장 사용
          </strong>
          <p className="lg:mt-2">
            우리는 플라스틱 없이, 자연을 향한 패키지를 사용해요.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!flex flex-col items-center lg:gap-6">
        <div className="relative w-[250px] aspect-square">
          <Image
            src="/value-slide-6.png"
            alt="14,200명의 가치 소비자 이미지"
            fill
            className="object-cover"
          ></Image>
        </div>
        <div className="text-center">
          <strong className="font-semibold text-dark-green  lg:text-xl">
            14,200명의 가치 소비자
          </strong>
          <p className="lg:mt-2">우리는 지구를 바꾸는 소비자들과 함께해요.</p>
        </div>
      </SwiperSlide>

      <div className="text-center lg:mt-9">
        <CustomLink href="#" variant="green" size="xxl">
          흙내음 더 알아보기
        </CustomLink>
      </div>
    </Swiper>
  );
}
