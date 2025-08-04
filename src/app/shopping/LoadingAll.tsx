import { Heart } from 'lucide-react';

export default function LoadingAll() {
  const categories = ['전체', '채소', '과일'];
  // 카테고리 탭 active
  const AllItemCategory = categories.map((category, i) => (
    <li key={i}>
      <button type="button">{category}</button>
    </li>
  ));

  return (
    <>
      <div className="mt-[1.5625rem]">
        <ul className="flex gap-2.5 font-semibold text-dark-green text-sm md:text-base">
          {AllItemCategory}
        </ul>
      </div>

      <ul className="animate-pulse grid mt-5 grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-5 md:gap-y-15 lg:grid-cols-4 ">
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-5 md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-5 md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-[1.3125rem] md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
        <li>
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-300"></div>
          <div className="relative mt-4 w-full">
            <div className="flex gap-0.5 w-full flex-col pr-4 md:flex-row md:gap-2 md:pr-6">
              {/* 상품명, 상세정보(중량) */}
              <div className="w-30 h-5 md:w-40 md:h-6 rounded-lg bg-gray-300"></div>
              <div className="w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
            </div>
            {/* 가격 */}
            <div className="mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
            <form className="absolute top-0.5 right-0 leading-1">
              <button className="cursor-pointer">
                <Heart
                  strokeWidth={1}
                  stroke="gray"
                  className="w-4.5 h-4.5 md:w-5 md:h-5"
                />
              </button>
            </form>
          </div>
        </li>
      </ul>
    </>
  );
}
