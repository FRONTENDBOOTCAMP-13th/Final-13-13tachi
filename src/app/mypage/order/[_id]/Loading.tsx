export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-row justify-between text-sm mb-4 mt-1">
        <div className="h-3 w-32 rounded-lg bg-gray-200" />
      </div>
      {/* 상품 */}
      <div className="flex flex-col justify-center items-center gap-10 border-1 rounded-lg border-light-gray w-full md:p-[1.125rem] p-3">
        <div className="flex md:flex-row md:justify-between flex-col w-full gap-5">
          <div className="flex flex-row items-center gap-3.5 ">
            {/* 이미지 */}
            <div className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 rounded-lg bg-gray-300 shadow-image"></div>
            {/* 상품 이름, 상세정보, 가격, 배송비 */}
            <div className="flex flex-col justufy-center gap-4">
              <div className="flex flex-row items-end">
                {/* 상품이름 */}
                <div className="md:h-4 h-3.5 w-30 rounded-lg bg-gray-300 mr-2.5" />
                {/* 상품 중량 */}
                <div className="h-3 w-10 rounded-lg bg-gray-200" />
              </div>
              <div className="flex gap-4 items-center">
                {/* 상품 가격 */}
                <div className="md:h-4 h-3.5 w-15 rounded-lg bg-gray-300" />
                {/* 수량 */}
                <div className="md:h-3 h-2.5 w-5 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col md:justify-center md:items-end justify-around gap-2">
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-full rounded-lg bg-gray-300" />
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-full rounded-lg bg-gray-300" />
          </div>
        </div>
        <div className="flex md:flex-row md:justify-between flex-col w-full gap-5">
          <div className="flex flex-row items-center gap-3.5 ">
            {/* 이미지 */}
            <div className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 rounded-lg bg-gray-300 shadow-image"></div>
            {/* 상품 이름, 상세정보, 가격, 배송비 */}
            <div className="flex flex-col justufy-center gap-4">
              <div className="flex flex-row items-end">
                {/* 상품이름 */}
                <div className="md:h-4 h-3.5 w-30 rounded-lg bg-gray-300 mr-2.5" />
                {/* 상품 중량 */}
                <div className="h-3 w-10 rounded-lg bg-gray-200" />
              </div>
              <div className="flex gap-4 items-center">
                {/* 상품 가격 */}
                <div className="md:h-4 h-3.5 w-15 rounded-lg bg-gray-300" />
                {/* 수량 */}
                <div className="md:h-3 h-2.5 w-5 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex md:flex-col md:justify-center md:items-end justify-around gap-2">
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-full rounded-lg bg-gray-300" />
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-full rounded-lg bg-gray-300" />
          </div>
        </div>
      </div>
      {/* 주문정보 */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-[1.875rem] flex flex-col gap-6 lg:mt-9 mt-8 h-full">
        <div>
          <div className="h-5 w-15 mb-7 rounded-lg bg-gray-300" />
          <div className="flex flex-col border-1 rounded-lg border-light-gray p-5 gap-4">
            <div className="h-4 w-15 rounded-lg bg-gray-200" />
            <div className="h-4 w-25 rounded-lg bg-gray-200" />
            <div className="h-4 w-40 rounded-lg bg-gray-200" />
          </div>
        </div>
        <div className="h-full">
          <div className="h-5 w-20 mb-7 rounded-lg bg-gray-300" />
          <div className="flex flex-col border-1 rounded-lg border-light-gray px-5 py-9 gap-4">
            <div className="flex flex-row justify-between">
              <div className="h-4 w-20 rounded-lg bg-gray-200" />
              <div className="h-4 w-20 rounded-lg bg-gray-200" />
            </div>
            <div className="flex flex-row justify-between">
              <div className="h-4 w-20 rounded-lg bg-gray-200" />
              <div className="h-4 w-20 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-9 mt-[4.0625rem]">
        <div className="w-[110px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[200px] lg:h-[48px] rounded-lg bg-gray-300" />
        <div className="w-[110px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[200px] lg:h-[48px] rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}
