export default function Input() {
  return (
    <div className="flex items-center lg:w-[285px] lg:h-[40px] border border-dark-green rounded-3xl overflow-hidden">
      <input
        type="text"
        placeholder="상품명을 입력해주세요"
        className="flex-grow px-3  text-sm outline-none"
      />
      <button
        type="submit"
        className="w-10 h-full flex justify-center items-center hover:bg-gray-300"
      >
        <svg></svg>
      </button>
    </div>
  );
}
