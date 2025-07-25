import Link from 'next/link';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

import './main.css';
// import ProductCard from '@/components/ProductCard';
import MainSlide from '@/app/MainSlide';
import ValueSlide from '@/app/ValueSlide';
import { getProducts } from '@/data/functions/post';
import { ProductType } from '@/types';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const res = await getProducts();
  const products: ProductType[] = res.ok === 1 ? res.item : [];
  const filteredItems = products.slice(0, 4);

  const hotItems = products.filter(item => item.extra?.isBest).slice(0, 4);

  const vegeItems = products
    .filter(item => item.extra?.category?.includes('채소'))
    .slice(0, 4);

  const fruitItems = products
    .filter(item => item.extra?.category?.includes('과일'))
    .slice(0, 4);

  return (
    <>
      <Header />
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
        <main className="mx-auto lg:space-y-15 lg:max-w-5xl lg:pt-15 lg:pb-25">
          {/* ST: 인기 상품 */}
          <section>
            <div className="flex items-center lg:gap-8">
              <h3 className="font-semibold lg:text-3xl">인기 상품</h3>
              <Link href="#" className="text-dark-green font-semibold">
                + 더보기
              </Link>
            </div>
            <ProductCard filteredItems={filteredItems} />
          </section>
          {/* ED: 인기 상품 */}

          {/* ST: 채소류 */}
          <section>
            <div className="flex items-center lg:gap-8">
              <h3 className="font-semibold lg:text-3xl">채소류</h3>
              <Link href="#" className="text-dark-green font-semibold">
                + 더보기
              </Link>
            </div>
            <ProductCard filteredItems={vegeItems} />
          </section>
          {/* ED: 채소류 */}

          {/* ST: 과일류 */}
          <section>
            <div className="flex items-center lg:gap-8">
              <h3 className="font-semibold lg:text-3xl">과일류</h3>
              <Link href="#" className="text-dark-green font-semibold">
                + 더보기
              </Link>
            </div>
            <ProductCard filteredItems={fruitItems} />
          </section>
          {/* ED: 과일류 */}

          {/* ST: 인기 레시피 */}
          <section>
            <div className="flex items-center lg:gap-8">
              <h3 className="font-semibold lg:text-3xl">인기 레시피</h3>
              <Link href="#" className="text-dark-green font-semibold">
                + 더보기
              </Link>
            </div>
            <ProductCard filteredItems={hotItems} />
          </section>
          {/* ED: 인기 레시피 */}

          {/* ST:  */}
          {/* ED:  */}
        </main>
        {/* ED: 상품 리스트 */}
      </div>
      <Footer />
    </>
  );
}
