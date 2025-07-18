import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import AllItems from '@/app/shopping/AllItems';
import HotItems from '@/app/shopping/HotItems';
import Search from '@/components/common/Search';

export default function ShoppingList() {
  return (
    <>
      <Header />
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
            <Search />
          </div>
          {/* ED: Search Bar */}

          {/* ST: 인기상품 */}
          <div className="lg:mt-7.5">
            <h3 className="font-bold text-dark-green lg:text-3xl">인기 상품</h3>
            <HotItems />
          </div>
          {/* ED: 인기상품 */}

          {/* ST: 전체 상품 */}
          <div className="lg:mt-7">
            <h3 className="font-bold text-dark-green lg:text-3xl">전체 상품</h3>
            <AllItems />
          </div>
          {/* ED: 전체 상품 */}
        </div>
      </main>
      <Footer />
    </>
  );
}
