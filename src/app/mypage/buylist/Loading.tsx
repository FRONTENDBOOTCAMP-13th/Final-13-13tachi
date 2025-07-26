export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-row justify-between text-sm mb-4">
        <div className="lg:h-3.5 lg:w-40 rounded-lg bg-gray-200" />
        <div className="lg:h-3.5 lg:w-18 rounded-lg bg-gray-200" />
      </div>
      <div className="flex flex-col justify-center items-center border-1 rounded-lg border-light-gray lg:w-[49.875rem] p-[1.125rem]">
        <div className="flex flex-col w-full gap-[2.125rem]" />
        <div className="flex flex-row justify-between w-full mb-9">
          <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
            {/* 이미지 */}
            <div className="lg:w-[6.25rem] lg:h-[6.25rem] rounded-lg bg-gray-300 shadow-image"></div>
            <div className="flex flex-col justufy-center lg:gap-4">
              {/* 상품 이름, 상세정보, 가격, 배송비 */}
              <div className="flex flex-row items-end">
                <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-300 mr-2.5" />
                <div className="lg:h-3 lg:w-10 rounded-lg bg-gray-200" />
              </div>
              <div className="flex gap-8 items-center">
                <div className="lg:h-4 w-20 rounded-lg bg-gray-300" />
                <div className="lg:h-3 lg:w-13 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end lg:gap-2">
            <div className="lg:w-[7.5rem] lg:h-[1.875rem] rounded-lg bg-gray-300" />
            <div className="lg:w-[7.5rem] lg:h-[1.875rem] rounded-lg bg-gray-300" />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
            {/* 이미지 */}
            <div className="lg:w-[6.25rem] lg:h-[6.25rem] rounded-lg bg-gray-300 shadow-image"></div>
            <div className="flex flex-col justufy-center lg:gap-4">
              {/* 상품 이름, 상세정보, 가격, 배송비 */}
              <div className="flex flex-row items-end">
                <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-300 mr-2.5" />
                <div className="lg:h-3 lg:w-10 rounded-lg bg-gray-200" />
              </div>
              <div className="flex gap-8 items-center">
                <div className="lg:h-4 w-20 rounded-lg bg-gray-300" />
                <div className="lg:h-3 lg:w-13 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end lg:gap-2">
            <div className="lg:w-[7.5rem] lg:h-[1.875rem] rounded-lg bg-gray-300" />
            <div className="lg:w-[7.5rem] lg:h-[1.875rem] rounded-lg bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
