'use client';

import { ApiRes, LikeItemType, ProductType, User } from '@/types';
import ProductCardItem from './ProductCardItem';

interface ProductCardProps {
  filteredItems: ProductType[];
  likeRes: ApiRes<LikeItemType[] | null>;
  accessToken: string;
  user: User | null;
}

export default function ProductCard({
  filteredItems, // 장보기 상품 목록
  likeRes, // 찜한 목록 최신 상태
  accessToken, // user의 accessToken
  user,
}: ProductCardProps) {
  const ProductCardList = filteredItems.map((item: ProductType, index) => (
    <ProductCardItem
      key={index}
      item={item}
      likeRes={likeRes!}
      accessToken={accessToken}
      user={user}
    />
  ));
  return (
    <>
      <ul className="grid mt-5 grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-5 md:gap-y-15 lg:grid-cols-4 ">
        {ProductCardList}
      </ul>
    </>
  );
}
