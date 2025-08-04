import { Heart } from 'lucide-react';

export default function LoadingHot() {
  return (
    <div className="mt-2 md:mt-4.5">
      <div className="hotitem-slide flex justify-between">
        <div className="w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-[1.5rem] lg:rounded-[3rem] ">
          <div className="flex flex-col items-center gap-2.5 p-4 md:p-4.5  lg:py-5.5 lg:px-6">
            {/* 이미지 */}
            <div className="relative w-full aspect-[18/17] rounded-[1.875rem] overflow-hidden bg-gray-300"></div>
            <div className="relative text-center w-full">
              {/* 상품명, 상세정보(중량), 가격 */}
              <div className="mx-auto w-20 h-[1.3125rem] md:h-6 md:w-30 rounded-lg bg-gray-300"></div>
              <div className="mx-auto w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
              <div className="mx-auto mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
              <form className="absolute leading-1 bottom-1 right-0 lg:bottom-0 lg:top-0.5 ">
                <button className="cursor-pointer">
                  <Heart
                    strokeWidth={1}
                    stroke="gray"
                    className="w-4.5 h-4.5 md:w-5 md:h-5"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-[1.5rem] lg:rounded-[3rem] ">
          <div className="flex flex-col items-center gap-2.5 p-4 md:p-4.5  lg:py-5.5 lg:px-6">
            {/* 이미지 */}
            <div className="relative w-full aspect-[18/17] rounded-[1.875rem] overflow-hidden bg-gray-300"></div>
            <div className="relative text-center w-full">
              {/* 상품명, 상세정보(중량), 가격 */}
              <div className="mx-auto w-20 h-[1.3125rem] md:h-6 md:w-30 rounded-lg bg-gray-300"></div>
              <div className="mx-auto w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
              <div className="mx-auto mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
              <form className="absolute leading-1 bottom-1 right-0 lg:bottom-0 lg:top-0.5 ">
                <button className="cursor-pointer">
                  <Heart
                    strokeWidth={1}
                    stroke="gray"
                    className="w-4.5 h-4.5 md:w-5 md:h-5"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-[1.5rem] lg:rounded-[3rem] ">
          <div className="flex flex-col items-center gap-2.5 p-4 md:p-4.5  lg:py-5.5 lg:px-6">
            {/* 이미지 */}
            <div className="relative w-full aspect-[18/17] rounded-[1.875rem] overflow-hidden bg-gray-300"></div>
            <div className="relative text-center w-full">
              {/* 상품명, 상세정보(중량), 가격 */}
              <div className="mx-auto w-20 h-[1.3125rem] md:h-6 md:w-30 rounded-lg bg-gray-300"></div>
              <div className="mx-auto w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
              <div className="mx-auto mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
              <form className="absolute leading-1 bottom-1 right-0 lg:bottom-0 lg:top-0.5 ">
                <button className="cursor-pointer">
                  <Heart
                    strokeWidth={1}
                    stroke="gray"
                    className="w-4.5 h-4.5 md:w-5 md:h-5"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-[1.5rem] lg:rounded-[3rem] ">
          <div className="flex flex-col items-center gap-2.5 p-4 md:p-4.5  lg:py-5.5 lg:px-6">
            {/* 이미지 */}
            <div className="relative w-full aspect-[18/17] rounded-[1.875rem] overflow-hidden bg-gray-300"></div>
            <div className="relative text-center w-full">
              {/* 상품명, 상세정보(중량), 가격 */}
              <div className="mx-auto w-20 h-[1.3125rem] md:h-6 md:w-30 rounded-lg bg-gray-300"></div>
              <div className="mx-auto w-10 h-4.5 md:w-7.5 md:h-6 md:mt-[0.0625rem]  rounded-lg bg-gray-200"></div>
              <div className="mx-auto mt-1 w-17.5 h-6.5 md:w-20 md:h-7.5 rounded-lg md:mt-1.5 bg-gray-200"></div>
              <form className="absolute leading-1 bottom-1 right-0 lg:bottom-0 lg:top-0.5 ">
                <button className="cursor-pointer">
                  <Heart
                    strokeWidth={1}
                    stroke="gray"
                    className="w-4.5 h-4.5 md:w-5 md:h-5"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
