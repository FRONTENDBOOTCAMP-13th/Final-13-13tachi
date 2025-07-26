export default function Loading() {
  return (
    <div className="animate-pulse h-full">
      <div className="grid grid-cols-4 w-fit h-full gap-x-6 gap-y-5 mx-auto">
        <div className="flex flex-col">
          <div className="lg:w-[11.25rem] lg:h-[11.25rem] rounded-lg shadow-image bg-gray-300" />
          <div className="flex justify-center mt-2.5">
            <div className="lg:h-4 lg:w-20 rounded-lg bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="lg:w-[11.25rem] lg:h-[11.25rem] rounded-lg shadow-image bg-gray-300" />
          <div className="flex justify-center mt-2.5">
            <div className="lg:h-4 lg:w-20 rounded-lg bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="lg:w-[11.25rem] lg:h-[11.25rem] rounded-lg shadow-image bg-gray-300" />
          <div className="flex justify-center mt-2.5">
            <div className="lg:h-4 lg:w-20 rounded-lg bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="lg:w-[11.25rem] lg:h-[11.25rem] rounded-lg shadow-image bg-gray-300" />
          <div className="flex justify-center mt-2.5">
            <div className="lg:h-4 lg:w-20 rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
