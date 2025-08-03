'use client';

import AllItems from '@/app/shopping/AllItems';
import { ProductType } from '@/types';

interface SearchItemsListProps {
  searchProducts: ProductType[];
  searchKeyword: string;
}

export default function SearchItemsList({
  searchProducts,
  searchKeyword,
}: SearchItemsListProps) {
  return <AllItems products={searchProducts} searchKeyword={searchKeyword} />;
}
