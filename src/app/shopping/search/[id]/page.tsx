import ShoppingSearchList from '@/app/shopping/search/[id]/ShoppingSearchList';
import { getProducts } from '@/data/functions/post';
import { ProductType } from '@/types';

export default async function ShoppingSearch() {
  const res = await getProducts();
  const products: ProductType[] = res.ok === 1 ? res.item : [];

  return (
    <>
      <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <ShoppingSearchList products={products} />
      </main>
    </>
  );
}
