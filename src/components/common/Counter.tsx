import { Minus, Plus } from 'lucide-react';

export default function Counter() {
  return (
    <>
      <div className="flex flex-row justify-between items-center border-[0.0625rem] border-light-gray rounded-lg lg:w-20 lg:h-[1.875rem]">
        <button className="lg:text-base lg:px-2 font-semibold hover:cursor-pointer">
          <Minus strokeWidth={3} className="w-3.5 h-3.5" />
        </button>
        <span className="lg:text-sm">1</span>
        <button className="lg:text-base lg:px-2 font-semibold hover:cursor-pointer">
          <Plus strokeWidth={3} className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
}
