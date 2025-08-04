import { Bookmark, Heart } from 'lucide-react';

export default function Loading() {
  return (
    <main className="animate-pulse mx-auto px-5 pt-12.5 pb-15 space-y-15 md:px-7.5 md:pb-20 md:space-y-12.5 lg:px-0 lg:max-w-5xl lg:pt-[4.0625rem] lg:pb-25">
      {/* ST: 인기 상품 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            인기 상품
          </h3>
          <span className="text-dark-green font-semibold text-xs md:text-sm lg:text-base">
            + 더보기
          </span>
        </div>
        <ul className="grid mt-5 grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-5 md:gap-y-15 lg:grid-cols-4 ">
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
      </section>
      {/* ED: 인기 상품 */}

      {/* ST: 채소류 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            채소류
          </h3>
          <span className="text-dark-green font-semibold text-xs md:text-sm lg:text-base">
            + 더보기
          </span>
        </div>
        <ul className="grid mt-5 grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-5 md:gap-y-15 lg:grid-cols-4 ">
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
      </section>
      {/* ED: 채소류 */}

      {/* ST: 과일류 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            과일류
          </h3>
          <span className="text-dark-green font-semibold text-xs md:text-sm lg:text-base">
            + 더보기
          </span>
        </div>
        <ul className="grid mt-5 grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-5 md:gap-y-15 lg:grid-cols-4 ">
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
      </section>
      {/* ED: 과일류 */}

      {/* ST: 인기 레시피 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            인기 레시피
          </h3>
          <span className="text-dark-green font-semibold text-xs md:text-sm lg:text-base">
            + 더보기
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[25px]">
          {/* mt를 컨테이너로 이동 */}
          <figure className="w-full">
            {/* lg:w-[15rem] 제거하고 w-full 적용 */}
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-300"></div>
            <figcaption className="mt-3">
              {/* mt-[12px]를 mt-3으로 변경 */}
              <div className="relative flex">
                {/* 레시피 제목 */}
                <div className="w-30 h-6.5 pr-5.5 md:w-40 md:h-7.5 md:pr-6 rounded-lg bg-gray-300"></div>
                <Bookmark
                  className={`absolute right-0 md:top-1 cursor-pointer w-[1.25rem] top-0 md:w-[1.5rem]`}
                  strokeWidth={1}
                  stroke="gray"
                />
              </div>
              <div className="flex justify-between items-center">
                {/* 레시피 재료, 작성자 */}
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
              </div>
            </figcaption>
          </figure>
          <figure className="w-full">
            {/* lg:w-[15rem] 제거하고 w-full 적용 */}
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-300"></div>
            <figcaption className="mt-3">
              {/* mt-[12px]를 mt-3으로 변경 */}
              <div className="relative flex">
                {/* 레시피 제목 */}
                <div className="w-30 h-6.5 pr-5.5 md:w-40 md:h-7.5 md:pr-6 rounded-lg bg-gray-300"></div>
                <Bookmark
                  className={`absolute right-0 md:top-1 cursor-pointer w-[1.25rem] top-0 md:w-[1.5rem]`}
                  strokeWidth={1}
                  stroke="gray"
                />
              </div>
              <div className="flex justify-between items-center">
                {/* 레시피 재료, 작성자 */}
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
              </div>
            </figcaption>
          </figure>
          <figure className="w-full">
            {/* lg:w-[15rem] 제거하고 w-full 적용 */}
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-300"></div>
            <figcaption className="mt-3">
              {/* mt-[12px]를 mt-3으로 변경 */}
              <div className="relative flex">
                {/* 레시피 제목 */}
                <div className="w-30 h-6.5 pr-5.5 md:w-40 md:h-7.5 md:pr-6 rounded-lg bg-gray-300"></div>
                <Bookmark
                  className={`absolute right-0 md:top-1 cursor-pointer w-[1.25rem] top-0 md:w-[1.5rem]`}
                  strokeWidth={1}
                  stroke="gray"
                />
              </div>
              <div className="flex justify-between items-center">
                {/* 레시피 재료, 작성자 */}
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
              </div>
            </figcaption>
          </figure>
          <figure className="w-full">
            {/* lg:w-[15rem] 제거하고 w-full 적용 */}
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-300"></div>
            <figcaption className="mt-3">
              {/* mt-[12px]를 mt-3으로 변경 */}
              <div className="relative flex">
                {/* 레시피 제목 */}
                <div className="w-30 h-6.5 pr-5.5 md:w-40 md:h-7.5 md:pr-6 rounded-lg bg-gray-300"></div>
                <Bookmark
                  className={`absolute right-0 md:top-1 cursor-pointer w-[1.25rem] top-0 md:w-[1.5rem]`}
                  strokeWidth={1}
                  stroke="gray"
                />
              </div>
              <div className="flex justify-between items-center">
                {/* 레시피 재료, 작성자 */}
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
                <div className="w-10 h-4 md:w-7.5 md:h-5 md:mt-[0.0625rem] rounded-lg bg-gray-200"></div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      {/* ED: 인기 레시피 */}
    </main>
  );
}
