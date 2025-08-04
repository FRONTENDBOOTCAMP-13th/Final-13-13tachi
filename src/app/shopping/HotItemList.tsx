'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import HotItem from './HotItem';
import './shopping.css';
import { ApiRes, LikeItemType, ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';
import { getLikeProducts, getProducts } from '@/data/functions/product';
import LoadingHot from '@/app/shopping/LoadingHot';

export default function HotItemList() {
  const { user } = useUserStore(); // 로그인 정보
  const accessToken = user?.token?.accessToken; // accessToken 값

  const [likeRes, setLikeRes] = useState<ApiRes<LikeItemType[]> | null>(null); // 좋아요 목록 최신 상태 관리
  const [products, setProducts] = useState<ApiRes<ProductType[]> | null>(null);

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res);
      })
      .catch(err => {
        console.error('상품 가져오기 실패:', err);
        setProducts({ ok: 0, message: '에러 발생!' });
      });
  }, []);

  useEffect(() => {
    // 현재 user의 좋아요 목록을 가져와서 likeRes에 넣어준다
    if (!accessToken) return;

    getLikeProducts(accessToken)
      .then(res => {
        setLikeRes(res);
      })
      .catch(err => {
        console.error('찜 가져오기 실패:', err);
        setLikeRes({ ok: 0, message: '에러 발생!' });
      });
  }, [accessToken]);

  const filteredItems =
    products?.ok === 1 && products.item
      ? products.item.filter((item: ProductType) => item.extra?.isBest)
      : [];

  const hotItemList = filteredItems.map((item: ProductType, index: number) => (
    <SwiperSlide
      key={index}
      className="shadow-image rounded-[1.5rem] lg:rounded-[3rem] "
    >
      <HotItem
        item={item}
        likeRes={likeRes!}
        accessToken={accessToken!}
        user={user}
      />
    </SwiperSlide>
  ));

  if (!products) {
    return <LoadingHot />;
  }

  return (
    <div className="mt-2 md:mt-4.5">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        autoHeight={true}
        loop={true}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="hotitem-slide"
      >
        {hotItemList}
      </Swiper>
    </div>
  );
}
