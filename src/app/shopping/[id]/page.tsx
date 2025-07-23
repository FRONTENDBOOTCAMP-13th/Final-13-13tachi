import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import CustomLink from '@/components/common/CustomLink';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { getProductDetails } from '@/data/functions/post';
import { ProductTypeRes } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function ShoppingDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  const res = (await getProductDetails(id)) as ProductTypeRes;
  console.log(res);
  console.log(res.item.name);

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto lg:max-w-5xl lg:pt-[4.0625rem] lg:py-25">
          {/* ST: Title */}
          <div>
            <p className="text-gray">HOME &gt; 장보기</p>
            <h2 className="font-bold lg:mt-5 lg:text-5xl">{res.item.name}</h2>
          </div>
          {/* ED: Title */}

          {/* ST: 상단 상품 정보*/}
          <div className="mx-auto w-fit lg:mt-10">
            <div className="relative w-[675px] aspect-[67.5/45] ">
              <Image
                src={`${API_URL}/${res.item.mainImages![0].path}`}
                alt={`${res.item.name} 이미지`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="lg:mt-10">
              <div className="flex justify-between">
                <p className="flex items-center font-bold lg:gap-2.5 lg:text-4xl">
                  {res.item.name}
                  <span className="text-gray font-normal lg:text-lg">
                    ({res.item.extra?.details})
                  </span>
                </p>
                <button type="button" className="cursor-pointer">
                  <Heart strokeWidth={1} className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-between items-center lg:mt-3">
                <strong className="flex items-center font-semibold text-orange lg:gap-2.5 lg:text-2xl">
                  {res.item.price?.toLocaleString()}원
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
              href="/shopping" //TODO 나중에 링크 수정
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
