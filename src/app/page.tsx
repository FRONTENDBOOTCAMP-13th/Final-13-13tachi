import './main.css';
import MainSlide from '@/app/MainSlide';
import ValueSlide from '@/app/ValueSlide';
import { getProducts } from '@/data/functions/post';
import { ProductType } from '@/types';
import MainProductLists from '@/app/MainProductLists';

export default async function Home() {
  const res = await getProducts();
  const products: ProductType[] = res.ok === 1 ? res.item : [];

  return (
    <main>
      <div>
        {/* ST: 메인 슬라이드 */}
        <div className="max-w-full mx-auto">
          <MainSlide />
        </div>
        {/* ED: 메인 슬라이드 */}

        {/* ST: 우리가 함께 만든 변화 */}
        <div className="mx-auto bg-light-yellow lg:max-w-5xl lg:py-12.5">
          <h2 className="text-center font-semibold lg:text-5xl">
            우리가 함께 만든 변화
          </h2>
          <p className="text-center lg:mt-4 lg:text-lg">
            {' '}
            우리는 가치 있는 소비를 함께합니다.
          </p>
          <ValueSlide />
        </div>
        {/* ED: 우리가 함께 만든 변화 */}

        {/* ST: 상품 리스트 */}
        <MainProductLists products={products} />
        {/* ED: 상품 리스트 */}
      </div>
    </main>
  );
}
