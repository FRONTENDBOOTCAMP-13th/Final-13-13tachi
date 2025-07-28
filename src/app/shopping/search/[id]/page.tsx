import SearchBar from '@/components/common/SearchBar';
import { getProducts } from '@/data/functions/post';
import { ProductType } from '@/types';
import SearchItemsList from '@/app/shopping/search/[id]/SearchItemsList';

export default async function ShoppingSearch() {
  const res = await getProducts();
  const products: ProductType[] = res.ok === 1 ? res.item : [];

  return (
    <>
      <main>
        <div className="mx-auto lg:max-w-5xl lg:pt-[4.0625rem] lg:py-25">
          {/* ST: 오늘의 못난이는? */}
          <div>
            <p className="text-gray">HOME &gt; 장보기</p>
            <h2 className="font-bold lg:mt-5 lg:text-center lg:text-5xl">
              오늘의 못난이는?
            </h2>
          </div>
          {/* ED: 오늘의 못난이는? */}

          {/* ST: Search Bar */}
          <div className="w-fit lg:mt-[1.5625rem] lg:mx-auto">
            <SearchBar handleType="handleProductSearch" />
          </div>
          {/* ED: Search Bar */}

          {/* ST: 전체 상품 */}
          <div className="lg:mt-7">
            <SearchItemsList products={products} />
          </div>
          {/* ED: 전체 상품 */}
        </div>
      </main>
    </>
  );
}
