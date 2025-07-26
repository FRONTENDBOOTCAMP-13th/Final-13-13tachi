export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* 아이템 한개 */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between lg:w-[49.375rem] lg:my-[30px]">
          <div className="flex flex-row items-center gap-[1.5625rem]">
            <div className="flex flex-row lg:gap-3.5 lg:h-[6.25rem]">
              {/* 이미지 */}
              <div className="lg:w-[6.25rem] lg:h-[6.25rem] bg-gray-300 rounded-lg shadow-image"></div>
              {/* 상품 정보 */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* 상품 이름, 상세정보(중량) */}
                  <div className="flex flex-row items-end mb-4">
                    <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-300 mr-2.5" />
                    <div className="lg:h-3 lg:w-10 rounded-lg bg-gray-200" />
                  </div>
                  {/* 상품 가격 */}
                  <div className="lg:h-3 lg:w-13 rounded-lg bg-gray-200" />
                </div>
                {/* 수량 버튼 */}
                <div className="flex flex-row justify-center items-center gap-5 border-[0.0625rem] border-gray-200 bg-gray-200 rounded-lg lg:w-20 lg:h-[1.875rem] p-1"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end gap-[1.5625rem]">
            <div className="lg:w-20 lg:h-[1.875rem] rounded-lg bg-gray-300" />
            <div className="lg:h-4 lg:w-13 rounded-lg bg-gray-300" />
          </div>
        </div>
        <hr className="text-light-gray w-full" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between lg:w-[49.375rem] lg:my-[30px]">
          <div className="flex flex-row items-center gap-[1.5625rem]">
            <div className="flex flex-row lg:gap-3.5 lg:h-[6.25rem]">
              {/* 이미지 */}
              <div className="lg:w-[6.25rem] lg:h-[6.25rem] bg-gray-300 rounded-lg shadow-image"></div>
              {/* 상품 정보 */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* 상품 이름, 상세정보(중량) */}
                  <div className="flex flex-row items-end mb-4">
                    <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-300 mr-2.5" />
                    <div className="lg:h-3 lg:w-10 rounded-lg bg-gray-200" />
                  </div>
                  {/* 상품 가격 */}
                  <div className="lg:h-3 lg:w-13 rounded-lg bg-gray-200" />
                </div>
                {/* 수량 버튼 */}
                <div className="flex flex-row justify-center items-center gap-5 border-[0.0625rem] border-gray-200 bg-gray-200 rounded-lg lg:w-20 lg:h-[1.875rem] p-1"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end gap-[1.5625rem]">
            <div className="lg:w-20 lg:h-[1.875rem] rounded-lg bg-gray-300" />
            <div className="lg:h-4 lg:w-13 rounded-lg bg-gray-300" />
          </div>
        </div>
        <hr className="text-light-gray w-full" />
      </div>
      {/* 가격 */}
      <div className="flex justify-end">
        <div className="lg:mt-[1.875rem] lg:h-5 lg:w-40 rounded-lg bg-gray-200"></div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-center">
        <div className="lg:w-[11.25rem] lg:h-[3.125rem] rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}
