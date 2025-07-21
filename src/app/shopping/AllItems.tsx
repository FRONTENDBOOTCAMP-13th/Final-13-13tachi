'use client';

import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/data/functions/post';
import { ApiRes } from '@/types';
import { ProductType } from '@/types/product';
import { useEffect, useState } from 'react';

export default function AllItems() {
  const [activeTab, setActiveTab] = useState('전체');

  const [products, setProducts] = useState<ApiRes<ProductType[]> | null>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredItems = products && products.ok === 1 ? products.item : [];
  // const filteredItems = products?.ok === 1 ? products.item : [];

  // activeTab === '전체'
  //   ? products
  //   : products.filter(item => item.category === activeTab);

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
      <ProductCard filteredItems={filteredItems} />
    </>
  );
}
