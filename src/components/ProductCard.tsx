import { ProductType } from '@/types';
import ProductCardItem from './ProductCardItem';

interface ProductCardProps {
  filteredItems: ProductType[];
}

export default function ProductCard({ filteredItems }: ProductCardProps) {
  const ProductCardList = filteredItems.map((item: ProductType, index) => (
    <ProductCardItem key={index} item={item} />
  ));
  return (
    <>
      <ul className="grid lg:mt-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-15">
        {ProductCardList}
      </ul>
    </>
  );
}
