'use client';

import ALLItemList from '@/app/shopping/AllItemList';
import { useState } from 'react';

interface AllItems {
  title: string;
  details: string;
  price: string;
  img: string;
  category: string;
}

const shoppingArr: AllItems[] = [
  {
    title: '감쟈합니다111111111111111111111111111111111111111111111111111111',
    details: '1kg',
    price: '3,250원',
    img: '/assets/shopping/items1.png',
    category: '과일',
  },
  {
    title: '바니바니바니바니 당근당근',
    details: '2개',
    price: '1,800원',
    img: '/assets/shopping/items2.png',
    category: '과일',
  },
  {
    title: '길쭉이 오이',
    details: '52개',
    price: '5,252원',
    img: '/assets/shopping/items3.png',
    category: '채소',
  },
  {
    title: '구 양배추 현 조세호',
    details: '1개',
    price: '1,840원',
    img: '/assets/shopping/items4.png',
    category: '채소',
  },
  {
    title: '단호하게 단호박',
    details: '1개',
    price: '2,100원',
    img: '/assets/shopping/items5.png',
    category: '채소',
  },
  {
    title: 'bro콜리',
    details: '200g',
    price: '1,500원',
    img: '/assets/shopping/items6.png',
    category: '채소',
  },
  {
    title: '토맛 토마토',
    details: '400g',
    price: '3,400원',
    img: '/assets/shopping/items7.png',
    category: '과일',
  },
  {
    title: '감쟈합니다',
    details: '1kg',
    price: '3,250원',
    img: '/assets/shopping/items1.png',
    category: '채소',
  },
  {
    title: '바니바니바니바니 당kjkk근당근',
    details: '2개',
    price: '1,800원',
    img: '/assets/shopping/items2.png',
    category: '채소',
  },
  {
    title: '길쭉이 오이',
    details: '52개',
    price: '5,252원',
    img: '/assets/shopping/items3.png',
    category: '채소',
  },
  {
    title: '구 양배추 현 조세호',
    details: '1개',
    price: '1,840원',
    img: '/assets/shopping/items4.png',
    category: '과일',
  },
  {
    title: '단호하게 단호박',
    details: '1개',
    price: '2,100원',
    img: '/assets/shopping/items5.png',
    category: '과일',
  },
  {
    title: 'bro콜리',
    details: '200g',
    price: '1,500원',
    img: '/assets/shopping/items6.png',
    category: '채소',
  },
  {
    title: '토맛 토마토',
    details: '400g',
    price: '3,400원',
    img: '/assets/shopping/items7.png',
    category: '채소',
  },
  {
    title: '감쟈합니다',
    details: '1kg',
    price: '3,250원',
    img: '/assets/shopping/items1.png',
    category: '과일',
  },
  {
    title: '바니바니바니바니 당kjkk근당근',
    details: '2개',
    price: '1,800원',
    img: '/assets/shopping/items2.png',
    category: '과일',
  },
  {
    title: '길쭉이 오이',
    details: '52개',
    price: '5,252원',
    img: '/assets/shopping/items3.png',
    category: '과일',
  },
  {
    title: '구 양배추 현 조세호',
    details: '1개',
    price: '1,840원',
    img: '/assets/shopping/items4.png',
    category: '과일',
  },
  {
    title: '단호하게 단호박',
    details: '1개',
    price: '2,100원',
    img: '/assets/shopping/items5.png',
    category: '과일',
  },
  {
    title: 'bro콜리',
    details: '200g',
    price: '1,500원',
    img: '/assets/shopping/items6.png',
    category: '채소',
  },
];

export default function AllItems() {
  const [activeTab, setActiveTab] = useState('전체');

  const filteredItems =
    activeTab === '전체'
      ? shoppingArr
      : shoppingArr.filter(item => item.category === activeTab);

  const categories = ['전체', '채소', '과일'];
  const AllItemCategory = categories.map((category, i) => {
    return (
      <li key={i}>
        <button
          type="button"
          onClick={() => setActiveTab(category)}
          className={`cursor-pointer ${
            activeTab === category
              ? 'text-orange font-semibold'
              : 'text-dark-green font-semibold'
          }`}
        >
          {category}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="lg:mt-[1.5625rem] lg:flex lg:justify-between lg:items-center">
        <ul className="font-semibold text-dark-green lg:flex lg:gap-2.5">
          {AllItemCategory}
        </ul>

        <button
          type="button"
          className="font-semibold text-dark-green cursor-pointer"
        >
          정렬기준
        </button>
      </div>
      <ALLItemList filteredItems={filteredItems} />
    </>
  );
}
