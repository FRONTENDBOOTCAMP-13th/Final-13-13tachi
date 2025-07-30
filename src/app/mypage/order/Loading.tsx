export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-row justify-between text-sm mb-4 mt-1">
        <div className="h-3 w-32 rounded-lg bg-gray-200" />
        <div className="h-3 w-15 rounded-lg bg-gray-200" />
      </div>
      <div className="flex flex-col justify-center items-center gap-[2.125rem] border-1 rounded-lg border-light-gray lg:w-[49.875rem] md:w-[31.75rem] w-80 md:p-[1.125rem] p-3">
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
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-36 rounded-lg bg-gray-300" />
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-36 rounded-lg bg-gray-300" />
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
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-36 rounded-lg bg-gray-300" />
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-36 rounded-lg bg-gray-300" />
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
          <div className="flex md:flex-col md:justify-center md:items-end justify-around gap-2 ">
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-36 rounded-lg bg-gray-300" />
            <div className="md:w-[6.0625rem] h-[1.5625rem] w-36 rounded-lg bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
