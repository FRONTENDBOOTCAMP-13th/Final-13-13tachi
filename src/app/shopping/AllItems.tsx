'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductType } from '@/types';

interface AllItemsProps {
  products: ProductType[];
}

export default function AllItems({ products }: AllItemsProps) {
  const [activeTab, setActiveTab] = useState('전체');
  const categories = ['전체', '채소', '과일'];

  const filteredItems =
    activeTab === '전체'
      ? products
      : products.filter(item => item.extra?.category?.includes(activeTab));

  const AllItemCategory = categories.map((category, i) => (
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
  ));

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
      <ProductCard filteredItems={filteredItems} />
    </>
  );
}
