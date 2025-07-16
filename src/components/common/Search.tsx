import Image from 'next/image';

export default function Search() {
  return (
    <div
      className="flex items-center lg:w-[17.8125rem] lg:h-[2.5rem] bg-white border border-dark-green placeholder-gray lg:placeholder:text-sm rounded-3xl overflow-hidden"
      style={{ boxShadow: 'inset 1px 1px 4px rgba(0, 0, 0, 0.1)' }}
    >
      <input
        type="text"
        placeholder="상품명을 입력해주세요"
        className="flex-grow lg:px-3 lg:text-sm outline-none"
      />
      <button
        type="submit"
        className="w-10 h-full flex justify-center items-center"
      >
        <Image src="/search.svg" alt="검색" width={16} height={16} />
      </button>
    </div>
  );
}
