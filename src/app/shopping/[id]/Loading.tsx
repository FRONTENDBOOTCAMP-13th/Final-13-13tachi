import Button from '@/components/common/Button';
import CustomLink from '@/components/common/CustomLink';
import { Heart, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Loading() {
  return (
    <div className="animate-pulse mx-auto px-5 pt-7.5 pb-15 md:px-7.5 md:pt-12.5 md:pb-20 lg:px-0 lg:max-w-5xl lg:pt-[4.0625rem] lg:pb-25">
      {/* ST: Title */}
      <div>
        <h2 className="text-gray text-xs md:text-sm lg:text-base">
          <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
          <Link href="/shopping">장보기</Link>&nbsp;&gt;&nbsp;
          <span className="inline-block w-20 h-4.5 md:w-30 md:h-5 lg:w-40 lg:h-7 align-middle rounded-lg bg-gray-200"></span>
        </h2>

        {/* 상품 이름 */}
        <div className="mt-5 w-45 h-9 md:w-60 md:h-10.5 lg:w-70 lg:h-12 rounded-lg bg-gray-300"></div>
      </div>
      {/* ED: Title */}

      {/* ST: 상품 상세 내용 */}

      <div className="mt-7.5 w-full md:mx-auto md:mt-7.5 md:w-fit lg:mt-10 ">
        <div className="relative w-full aspect-[67.5/45] md:w-[675px] rounded-lg bg-gray-300"></div>
        <div className="mt-7.5 md:mt-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5 w-[calc(100%-1.375rem)]">
              {/* 상품 이름 */}
              <div className="w-45 h-8 md:w-50 md:h-9 lg:w-60 lg:h-10.5 rounded-lg bg-gray-300"></div>
              {/* 상세정보(중량) */}
              <div className="w-10 h-5 lg:w-13 lg:h-9 rounded-lg bg-gray-200"></div>
            </div>
            {/* ST: 찜하기 */}
            <form className="leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
            {/* ED: 찜하기 */}
          </div>
          <div className="flex justify-between items-center mt-3">
            {/* 가격 */}
            <div className="flex items-center gap-2.5 w-25 h-6.5 md:w-30 md:h-7.5 lg:w-35 lg:h-8.5 rounded-lg bg-gray-200"></div>
            {/* ST: 카운터 */}
            <div className="flex flex-row justify-between items-center w-16 h-6 border-[0.0625rem] border-light-gray rounded-lg md:w-20 md:h-[1.875rem]">
              <button
                type="button"
                className="px-1 lg:px-2 hover:cursor-pointer"
              >
                <Minus strokeWidth={3} className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs md:text-sm">1</span>
              <button
                type="button"
                className="px-1 lg:px-2 hover:cursor-pointer"
              >
                <Plus strokeWidth={3} className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* ED: 카운터 */}
          </div>
        </div>
        <div className="flex justify-end flex-wrap gap-3 mt-7.5 md:mt-10 md:gap-4 lg:justify-between ">
          {/* ST: 레시피 보러가기 */}
          <CustomLink variant="white" size="xxl" type="button" href="#">
            레시피 보러가기
          </CustomLink>
          {/* ED: 레시피 보러가기 */}

          {/* ST: 구매하기 */}
          <CustomLink variant="green" size="xxl" href="#">
            구매하기
          </CustomLink>
          {/* ED: 구매하기 */}

          {/* ST: 장바구니 */}
          <form>
            <Button variant="green" size="xxl">
              장바구니 담기
            </Button>
          </form>
          {/* ED: 장바구니 */}
        </div>
      </div>
      {/* ED: 상단 상품 정보*/}

      {/* ST: 상품 정보*/}
      <div className="mt-12.5 space-y-12.5 md:mt-15 lg:mt-20 lg:space-y-[3.75rem]">
        {/* ST: 품목 요약 */}
        <div>
          <h4 className="font-semibold text-dark-green text-lg md:text-2xl lg:text-3xl">
            품목 요약
          </h4>
          <ul className="mt-3 pt-4 pl-4 leading-[1.7] border-t border-light-gray list-disc text-sm md:text-base md:mt-4 md:pt-5 md:pl-5 lg:pt-6 lg:pl-6">
            {/* 품목 요약 */}
            <li>
              <div className="w-full h-5.5 md:h-6.5 rounded-lg bg-gray-300"></div>
            </li>
            <li>
              <div className="mt-1 w-full h-5.5 md:mt-2 md:h-6.5 rounded-lg bg-gray-300"></div>
            </li>
          </ul>
        </div>
        {/* ED: 품목 요약 */}

        {/* ST: 보관법*/}
        <div>
          <h4 className="font-semibold text-dark-green text-lg md:text-2xl lg:text-3xl">
            보관법
          </h4>
          <ul className="mt-3 pt-4 pl-4 leading-[1.7] border-t border-light-gray list-disc text-sm md:text-base md:mt-4 md:pt-5 md:pl-5 lg:pt-6 lg:pl-6">
            {/* 보관법 */}
            <li>
              <div className="mt-1 w-full h-5.5 md:mt-2 md:h-6.5 rounded-lg bg-gray-300"></div>
            </li>
          </ul>
        </div>
        {/* ED: 보관법 */}

        {/* ST: 판매자 정보*/}
        <div>
          <h4 className="font-semibold text-dark-green text-lg md:text-2xl lg:text-3xl">
            판매자 정보
          </h4>
          <div className="flex flex-col items-start gap-6 mt-3 pt-4 pl-4 leading-[1.7] border-t border-light-gray list-disc text-sm md:flex-row md:gap-0 md:mt-4 md:pt-5 md:pl-5 md:text-base lg:pt-6 lg:pl-6">
            <div className="flex items-center gap-4 w-60 md:mr-8 lg:mr-12">
              {/* 판매자 이미지 */}
              <div className="relative w-20 aspect-square rounded-lg overflow-hidden md:w-25 bg-gray-300"></div>
              <div>
                {/* 판매 농장 */}
                <div className="w-28 h-7 md:w-30 md:h-8 rounded-lg bg-gray-300"></div>
                {/* 판매자 이름 */}
                <div className="mt-1 w-28 h-7 md:w-30 md:h-8 rounded-lg bg-gray-300"></div>
              </div>
            </div>
            <ul className="w-full leading-[1.7] list-disc flex-1">
              {/* 판매농장 설명 */}
              <li>
                <div className="mt-1 w-full h-5.5 md:mt-2 md:h-6.5 rounded-lg bg-gray-300"></div>
              </li>
              <li>
                <div className="mt-1 w-full h-5.5 md:mt-2 md:h-6.5 rounded-lg bg-gray-300"></div>
              </li>
              <li>
                <div className="mt-1 w-full h-5.5 md:mt-2 md:h-6.5 rounded-lg bg-gray-300"></div>
              </li>
              <li>
                <div className="mt-1 w-full h-5.5 md:mt-2 md:h-6.5 rounded-lg bg-gray-300"></div>
              </li>
            </ul>
          </div>
        </div>
        {/* ED: 판매자 정보 */}
      </div>
      {/* ED: 상품 정보*/}

      {/* ED: 상품 상세 내용 */}

      {/* ST: 목록으로*/}
      <div className="w-fit mx-auto mt-12.5 lg:mt-[4.0625rem]">
        <CustomLink variant="green" size="xxl" type="button" href="/shopping">
          목록으로
        </CustomLink>
      </div>
      {/* ED: 목록으로*/}
    </div>
    // <p className="w-100 h-100 bg-amber-950">asdfasdf</p>;
  );
}
