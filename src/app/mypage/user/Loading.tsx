export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full animate-pulse">
      <div className="flex flex-col gap-2">
        <h3 className="w-full text-xl font-semibold">회원정보</h3>
        <hr className="text-light-gray w-full mb-5" />
      </div>
      <div className="flex flex-col">
        <div>
          <div className="w-20 h-20 rounded-[50%] bg-gray-300 mb-6" />
          {/* <div className="lg:h-20 lg:w-20 rounded-[50%] bg-gray-200" /> */}
          <div className="flex flex-col gap-4 text-base">
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">이름</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                <div className="h-4 w-15 rounded-lg bg-gray-200 mt-1" />
              </span>
            </div>
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">이메일</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                <div className="h-4 w-40 rounded-lg bg-gray-200 mt-1" />
              </span>
            </div>
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">전화번호</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                <div className="h-4 w-30 rounded-lg bg-gray-200 mt-1" />
              </span>
            </div>
            <div className="grid grid-cols-[4.5rem_1.125rem_1fr] items-start">
              <span className="font-semibold">주소</span>
              <div className="border-l-2 border-light-gray h-4 mt-1"></div>
              <span>
                <div className="h-4 w-50 rounded-lg bg-gray-200 mt-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-auto">
        <div className="w-[110px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[200px] lg:h-[48px] bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
