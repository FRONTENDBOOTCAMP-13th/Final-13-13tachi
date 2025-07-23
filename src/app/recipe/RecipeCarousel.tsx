'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import Image from 'next/image';

import './recipe.css';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

interface Recipe {
  author: string;
  ingredients: string;
  title: string;
  img: string;
}

export default function RecipeCarousel() {
  const recipeArr: Recipe[] = [
    {
      author: 'oneway',
      ingredients: '당근',
      title: '사과 올린 샌드위치',
      img: '/imgs/recipe/recipe1.png',
    },
    {
      author: 'oneway',
      ingredients: '가지',
      title: '가지 올린 샌드위치',
      img: '/imgs/recipe/recipe2.png',
    },
    {
      author: 'oneway',
      ingredients: '고추',
      title: '고추 올린 샌드위치',
      img: '/imgs/recipe/recipe3.png',
    },
    {
      author: 'oneway',
      ingredients: '배추',
      title: '배추 올린 샌드위치',
      img: '/imgs/recipe/recipe4.png',
    },
    {
      author: 'oneway',
      ingredients: '양배추',
      title: '양배추 올린 샌드위치',
      img: '/imgs/recipe/recipe5.png',
    },
    {
      author: 'oneway',
      ingredients: '아스파라거스',
      title: '아스파라거스 올린 샌드위치인데 우동을 곁들인',
      img: '/imgs/recipe/recipe6.png',
    },
  ];

  const hotRecipeList = recipeArr.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <figure className=" shadow-image rounded-4xl">
          <Link href="#">
            <div className="relative h-[9.375rem] overflow-hidden rounded-t-4xl">
              <Image
                src={item.img}
                alt="레시피 이미지"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
              />
            </div>
            <figcaption className="pb-[3.75rem] pt-[0.9375rem] pl-5 pr-5 text-center max-h-[9.375rem]">
              <div className="relative flex items-center justify-center">
                <p className="text-[#454545] text-xs">{item.author}</p>
                <Bookmark className="absolute right-0 w-5" strokeWidth={1} />
              </div>
              <span className="text-orange text-sm mt-[0.5rem]">
                {item.ingredients}
              </span>
              <p className="text-xl font-semibold mt-[0.5rem]">{item.title}</p>
            </figcaption>
          </Link>
        </figure>
      </SwiperSlide>
    );
  });

  return (
    <>
      <div className="relative w-[1024px] flex items-center mx-auto lg:mt-4.5 lg:mb-12">
        <Swiper
          slidesPerView={4}
          spaceBetween={35}
          navigation={true}
          modules={[Navigation]}
          autoHeight={true}
          loop={true}
          className="recipe-slide"
        >
          {hotRecipeList}
        </Swiper>
      </div>
    </>
  );
}
