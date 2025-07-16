import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Input from '@/components/common/Input';
import AllItems from '@/components/shopping/AllItems';
import HotItemList from '@/components/shopping/HotItems';

export default function Shopping() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto lg:max-w-5xl lg:pt-17.5 lg:py-25">
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
            <Input />
          </div>
          {/* ED: Search Bar */}

          {/* ST: 인기상품 */}
          <div className="lg:mt-7.5">
            <h3 className="font-bold text-dark-green lg:text-3xl">인기 상품</h3>
            <HotItemList />
          </div>
          {/* ED: 인기상품 */}

          {/* ST: 전체 상품 */}
          <div className="lg:mt-7">
            <h3 className="font-bold text-dark-green lg:text-3xl">전체 상품</h3>
            <div className="lg:mt-[1.5625rem] lg:flex lg:justify-between lg:items-center">
              <ul className="font-semibold text-dark-green lg:flex lg:gap-2.5">
                <li>
                  <button type="button" className="cursor-pointer">
                    전체
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    채소
                  </button>
                </li>
                <li>
                  <button type="button" className="cursor-pointer">
                    과일
                  </button>
                </li>
              </ul>

              <button
                type="button"
                className="font-semibold text-dark-green cursor-pointer"
              >
                정렬기준
              </button>
            </div>
            <AllItems />
          </div>
          {/* ED: 전체 상품 */}
        </div>
      </main>
      <Footer />
    </>
  );
}
