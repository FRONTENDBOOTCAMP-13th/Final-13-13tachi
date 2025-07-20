import Link from 'next/link';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

import './main.css';
import ProductCard from '@/components/ProductCard';
import MainSlide from '@/app/MainSlide';
import ValueSlide from '@/app/ValueSlide';

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

const filteredItems = shoppingArr.slice(0, 4);

export default function Home() {
  return (
    <>
      <Header />
      <div>
        {/* ST: 메인 슬라이드 */}
        <div className="max-w-[1920px] mx-auto">
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
            <ProductCard filteredItems={filteredItems} />
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
            <ProductCard filteredItems={filteredItems} />
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
            <ProductCard filteredItems={filteredItems} />
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
