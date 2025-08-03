export default function Loading() {
  return (
    <div className="animate-pulse">
      <div>
        <div className="flex flex-col md:gap-8 gap-5 md:my-[1.875rem] my-5">
          <div className="flex flex-row items-center md:gap-[1.875rem] gap-5 md:h-[6.25rem] h-20">
            {/* 이미지 */}
            <div className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 bg-gray-300 rounded-lg shadow-image flex-shrink-0" />
            <div className="flex flex-col justufy-center gap-3">
              <div className="flex flex-row items-end">
                <div className="mr-1 md:h-4 h-3.5 w-30 bg-gray-300 rounded-lg" />
                <div className="h-3 w-10 font-medium mr-2.5 bg-gray-200 rounded-lg" />
                <div className="md:h-4 h-3.5 w-5 bg-gray-300 rounded-lg" />
              </div>
              <div>
                <div className="h-3.5 w-15 bg-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center md:gap-[1.875rem] gap-5 md:h-[6.25rem] h-20">
            {/* 이미지 */}
            <div className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 bg-gray-300 rounded-lg shadow-image flex-shrink-0" />
            <div className="flex flex-col justufy-center gap-3">
              <div className="flex flex-row items-end">
                <div className="mr-1 md:h-4 h-3.5 w-30 bg-gray-300 rounded-lg" />
                <div className="h-3 w-10 font-medium mr-2.5 bg-gray-200 rounded-lg" />
                <div className="md:h-4 h-3.5 w-5 bg-gray-300 rounded-lg" />
              </div>
              <div>
                <div className="h-3.5 w-15 bg-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <hr className="text-light-gray w-full mb-5" />
        {/* 금액 정보 */}
        <div className=" flex flex-col md:gap-4 gap-4 md:text-base text-sm mb-10 rounded-lg  bg-[#f4f4f4] p-4">
          <div className="flex justify-between">
            <div className="bg-gray-200 rounded-lg md:h-4 h-3.5 w-18" />
            <div className="bg-gray-200 rounded-lg md:h-4 h-3.5 w-18" />
          </div>
          <div className="flex justify-between">
            <div className="bg-gray-200 rounded-lg md:h-4 h-3.5 w-20" />
            <div className="bg-gray-200 rounded-lg md:h-4 h-3.5 w-10" />
          </div>
          <div className="flex justify-between">
            <div className="bg-gray-200 rounded-lg md:h-4 h-3.5 w-14" />
            <div className="bg-gray-200 rounded-lg md:h-4 h-3.5 w-18" />
          </div>
          <hr className="text-light-gray w-full md:my-2 my-1" />
          <div className="flex justify-between">
            <div className="bg-gray-200 rounded-lg md:h-4 h-3.5 w-18" />
            <div className="text-dark-red bg-gray-200 rounded-lg md:h-4 h-3.5 w-18" />
          </div>
        </div>

        <div>
          {/* 주문자 정보 */}
          <div className="flex md:flex-row flex-col justify-between gap-[2rem] w-full">
            <div className="flex flex-col gap-[0.625rem] md:w-full">
              <div className="md:h-6 h-5 md:w-25 w-20 bg-gray-300 rounded-lg mb-4" />
              <hr className="text-light-gray w-full md:mb-[1.5rem] mb-3" />
              <div>
                <div className="flex items-center lg:justify-between md:justify-center justify-between mb-[0.625rem]">
                  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center">
                    <div className="bg-gray-300 rounded-lg md:h-4 h-3.5 w-20" />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="bg-gray-200 rounded-lg w-full lg:h-[2.8125rem] h-[40px]" />
                  </div>
                </div>

                <div className="flex items-start mb-[0.625rem]">
                  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center">
                    <div className="bg-gray-300 rounded-lg md:h-4 h-3.5 w-20" />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="bg-gray-200 rounded-lg w-full lg:h-[2.8125rem] h-[40px]" />
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center pt-[0.375rem]">
                    <div className="bg-gray-300 rounded-lg md:h-4 h-3.5 w-20" />
                  </div>
                  <div className="flex flex-col gap-[0.625rem] mb-[0.625rem] w-full">
                    <div className="flex gap-[0.625rem] items-center">
                      <div className="bg-gray-200 rounded-lg lg:w-[7.4375rem] w-[100px] lg:h-[2.8125rem] h-[40px]" />
                      <div className="w-[4rem] h-[1.875rem] bg-gray-200 rounded-[0.3125rem]" />
                    </div>
                    <div className="bg-gray-200 rounded-lg w-full lg:h-[2.8125rem] h-[40px]" />
                    <div className="bg-gray-200 rounded-lg w-full lg:h-[2.8125rem] h-[40px]" />
                  </div>
                </div>
                <div className="flex items-center lg:justify-between md:justify-center justify-between mb-[0.625rem]">
                  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center">
                    <div className="bg-gray-300 rounded-lg md:h-4 h-3.5 w-20" />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="bg-gray-200 rounded-lg w-full lg:h-[2.8125rem] h-[40px]" />
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 수단 */}
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col gap-[0.625rem] w-full">
                <div className="md:h-6 h-5 md:w-25 w-18 bg-gray-300 rounded-lg mb-4" />
                <hr className="text-light-gray w-full md:mb-[1.5rem] mb-3" />
                <div className="flex justify-start">
                  <div className="flex flex-col gap-5 mb-4">
                    <div className="flex md:flex-row flex-col md:gap-8 gap-5">
                      <div className="h-4 w-24 bg-gray-300 rounded-lg" />

                      <div className="h-4 w-26 bg-gray-300 rounded-lg" />
                    </div>

                    <div className="flex md:flex-row flex-col gap-5">
                      <div className="h-4 w-18 bg-gray-300 rounded-lg" />
                    </div>
                    <div className="flex md:flex-row flex-col gap-5 md:gap-8">
                      <div className="h-4 w-30 bg-gray-300 rounded-lg" />
                      <div className="h-4 w-30 bg-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <div className="h-4 w-26 bg-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-semibold text-lg h-5 w-8 lg:mt-0 mt-15 text-right" />
          </div>
        </div>
        <div className="flex justify-center mt-20 mb-[6.25rem]">
          <div className="bg-gray-300 rounded-lg w-[110px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[200px] lg:h-[48px]" />
        </div>
      </div>
    </div>
  );
}
