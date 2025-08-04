'use client';

export default function ProfileLoading() {
  return (
    <div className="flex flex-col items-center justify-center lg:mt-[-4rem] md:mt-[-3rem] mt-[-2.5rem] relative animate-pulse">
      <div className="lg:w-[7.5rem] lg:h-[7.5rem] md:w-[6rem] md:h-[6rem] w-[5rem] h-[5rem] rounded-full bg-gray-300 ring-4 ring-white" />
      <span className="lg:mt-[0.625rem] md:mt-2 mt-1.5 lg:text-xl md:text-lg text-base font-semibold bg-gray-200 rounded w-24 h-6" />
    </div>
  );
}
