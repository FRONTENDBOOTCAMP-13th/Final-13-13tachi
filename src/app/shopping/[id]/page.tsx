import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import CustomLink from '@/components/common/CustomLink';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function ShoppingDetail() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto lg:max-w-5xl lg:pt-[4.0625rem] lg:py-25">
          {/* ST: Title */}
          <div>
            <p className="text-gray">HOME &gt; 장보기</p>
            <h2 className="font-bold lg:mt-5 lg:text-5xl">토맛 토마토</h2>
          </div>
          {/* ED: Title */}

          {/* ST: 상단 상품 정보*/}
          <div className="mx-auto w-fit lg:mt-10">
            <Image
              src="/assets/shopping/details-1.jpg"
              alt="토마토 사진"
              width={675}
              height={449}
            />
            <div className="lg:mt-10">
              <div className="flex justify-between">
                <p className="flex items-center font-bold lg:gap-2.5 lg:text-4xl">
                  토맛 토마토
                  <span className="text-gray font-normal lg:text-lg">
                    (350g)
                  </span>
                </p>
                <button type="button" className="cursor-pointer">
                  <Heart strokeWidth={1} className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-between items-center lg:mt-3">
                <strong className="flex items-center font-semibold text-orange lg:gap-2.5 lg:text-2xl">
                  3,500원
                  <span className="text-gray font-normal lg:text-base">
                    무료배송
                  </span>
                </strong>
                <Counter />
              </div>
            </div>
            <div className="flex justify-between lg:mt-10">
              <CustomLink variant="white" size="xxl" type="button" href="#">
                레시피 보러가기
              </CustomLink>
              <CustomLink variant="green" size="xxl" type="button" href="#">
                구매하기
              </CustomLink>
              <Button variant="green" size="xxl" type="button">
                장바구니 담기
              </Button>
            </div>
          </div>
          {/* ED: 상단 상품 정보*/}

          {/* ST: 상품 정보*/}
          <div className="lg:mt-20">
            <h3 className="font-bold lg:text-3xl">상품 정보</h3>
            <div className="border-t border-light-gray lg:mt-5 lg:pt-10">
              <div>
                <Image
                  src="/assets/shopping/details-2.png"
                  alt="판매자 사진"
                  width={964}
                  height={104}
                  className="mx-auto"
                />
              </div>
              <div>
                <Image
                  src="/assets/shopping/details-3.jpg"
                  alt="상품 상세 정보"
                  width={1024}
                  height={3899}
                />
              </div>
            </div>
          </div>
          {/* ED: 상품 정보*/}

          {/* ST: 목록으로*/}
          <div className="w-fit mx-auto lg:mt-[4.0625rem]">
            <CustomLink
              variant="green"
              size="xxl"
              type="button"
              href="http://localhost:3000/shopping" //TODO 나중에 링크 수정
            >
              목록으로
            </CustomLink>
          </div>
          {/* ED: 목록으로*/}
        </div>
      </main>
      <Footer />
    </>
  );
}
