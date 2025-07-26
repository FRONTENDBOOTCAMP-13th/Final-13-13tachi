export default function Loading() {
  return (
    <div className="flex flex-col gap-2.5 animate-pulse">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between lg:w-[49.875rem] border-1 border-light-gray lg:p-4.5 rounded-lg ">
          <div className="flex flex-row items-center gap-[1.5625rem]">
            <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
              <div className="lg:w-[6.25rem] lg:h-[6.25rem] rounded-lg bg-gray-300 shadow-image" />
              <div className="flex flex-col justufy-center lg:gap-2">
                <div className="flex flex-row items-end">
                  <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-300 mr-2.5" />
                  <div className="lg:h-3 lg:w-10 rounded-lg bg-gray-200" />
                </div>
                <div className="lg:h-4 w-20 rounded-lg bg-gray-300" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end lg:gap-2">
            <div className="lg:w-[6.0625rem] lg:h-[1.5625rem] rounded-lg bg-gray-300" />
            <div className="lg:w-[6.0625rem] lg:h-[1.5625rem] rounded-lg bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between lg:w-[49.875rem] border-1 border-light-gray lg:p-4.5 rounded-lg ">
          <div className="flex flex-row items-center gap-[1.5625rem]">
            <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
              <div className="lg:w-[6.25rem] lg:h-[6.25rem] rounded-lg bg-gray-300 shadow-image" />
              <div className="flex flex-col justufy-center lg:gap-2">
                <div className="flex flex-row items-end">
                  <div className="lg:h-4 lg:w-30 rounded-lg bg-gray-300 mr-2.5" />
                  <div className="lg:h-3 lg:w-10 rounded-lg bg-gray-200" />
                </div>
                <div className="lg:h-4 w-20 rounded-lg bg-gray-300" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end lg:gap-2">
            <div className="lg:w-[6.0625rem] lg:h-[1.5625rem] rounded-lg bg-gray-300" />
            <div className="lg:w-[6.0625rem] lg:h-[1.5625rem] rounded-lg bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
