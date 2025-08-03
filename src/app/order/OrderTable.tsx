'use client';

interface OrderTableType {
  total: number;
}

export default function OrderTable({ total }: OrderTableType) {
  return (
    <>
      <hr className="text-light-gray w-full mb-5" />
      <div className=" flex flex-col gap-2 md:text-base text-sm mb-10 rounded-lg  bg-[#f4f4f4] p-4">
        <div className="flex justify-between">
          <span className="font-semibold">주문 금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">적립금 사용</span>
          <span>0원</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">배송비</span>
          <span>무료배송</span>
        </div>
        <hr className="text-light-gray w-full md:my-2 my-1" />
        <div className="flex justify-between font-semibold">
          <span>결제 금액</span>
          <span className=" text-dark-red">{total.toLocaleString()}원</span>
        </div>
      </div>
    </>
  );
}
