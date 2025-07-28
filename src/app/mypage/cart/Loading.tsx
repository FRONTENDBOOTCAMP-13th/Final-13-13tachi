import { X } from 'lucide-react';

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* 아이템 한개 */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full lg:my-[30px] md:my-6 my-5">
          <div className="flex w-full justify-between">
            {/* 이미지 */}
            <div className="relative mr-[1.5625rem] md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 bg-gray-300 rounded-lg shadow-image flex-shrink-0"></div>
            {/* 상품 정보 */}
            <div className="flex flex-col gap-3.5 w-full">
              <div className="flex flex-row justify-between">
                <div>
                  {/* 상품 이름, 상세정보(중량) */}
                  <div className="flex flex-row items-end mt-1 mb-4">
                    <div className="md:h-4 h-3.5 md:w-30 w-20   rounded-lg bg-gray-300 mr-2.5" />
                    <div className="h-3 w-10 rounded-lg bg-gray-200" />
                  </div>
                  {/* 상품 가격 */}
                  <div className="md:h-4 h-3.5 w-13 rounded-lg bg-gray-200" />
                </div>
                {/* 삭제 버튼 */}
                <X color="gray" />
              </div>
              <div className="flex flex-row justify-between gap-7">
                {/* 수량 버튼 */}
                <div className="md:w-20 md:h-[1.875rem] w-16 h-6 border-[0.0625rem] border-gray-200 bg-gray-200 rounded-lg p-1"></div>
                {/* 개별 총 가격 */}
                <div className="md:h-4 w-13 h-3.5 rounded-lg bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <hr className="text-light-gray w-full" />
      </div>
      {/* 아이템 한개 */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full lg:my-[30px] md:my-6 my-5">
          <div className="flex w-full justify-between">
            {/* 이미지 */}
            <div className="relative mr-[1.5625rem] md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 bg-gray-300 rounded-lg shadow-image flex-shrink-0"></div>
            {/* 상품 정보 */}
            <div className="flex flex-col gap-3.5 w-full">
              <div className="flex flex-row justify-between">
                <div>
                  {/* 상품 이름, 상세정보(중량) */}
                  <div className="flex flex-row items-end mt-1 mb-4">
                    <div className="md:h-4 h-3.5 md:w-30 w-20   rounded-lg bg-gray-300 mr-2.5" />
                    <div className="h-3 w-10 rounded-lg bg-gray-200" />
                  </div>
                  {/* 상품 가격 */}
                  <div className="md:h-4 h-3.5 w-13 rounded-lg bg-gray-200" />
                </div>
                {/* 삭제 버튼 */}
                <X color="gray" />
              </div>
              <div className="flex flex-row justify-between gap-7">
                {/* 수량 버튼 */}
                <div className="md:w-20 md:h-[1.875rem] w-16 h-6 border-[0.0625rem] border-gray-200 bg-gray-200 rounded-lg p-1"></div>
                {/* 개별 총 가격 */}
                <div className="md:h-4 w-13 h-3.5 rounded-lg bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
        <hr className="text-light-gray w-full" />
      </div>
      {/* 가격 */}
      <div className="flex justify-end">
        <div className="lg:mt-[1.875rem] md:mt-6 mt-4 h-5 w-40 rounded-lg bg-gray-200"></div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-center lg:mt-[4.0625rem] md:mt-8 mt-6">
        <div className="w-[11.25rem] h-[3.125rem] rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}
