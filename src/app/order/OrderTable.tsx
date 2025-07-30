'use client';

// import { Circle, CircleEqual, MinusCircle, PlusCircle } from 'lucide-react';

interface OrderTableType {
  total: number;
}

export default function OrderTable({ total }: OrderTableType) {
  return (
    <>
      {/* <table className="w-full text-center border-collapse table-fixed mb-10 md:table hidden">
        <thead>
          <tr>
            <th className="border border-l-0 md:py-3 py-2 bg-disable-gray md:text-base text-sm">
              주문 금액
            </th>
            <th className="border md:py-3 py-2 bg-disable-gray md:text-base text-sm">
              적립금 사용
            </th>
            <th className="border md:py-3 py-2 bg-disable-gray md:text-base text-sm">
              배송비
            </th>
            <th className="border border-r-0 md:py-3 py-2 bg-disable-gray md:text-base text-sm">
              결제 금액
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-l-0 relative md:py-4 py-2 md:text-base text-sm">
              <span>{total.toLocaleString()}</span>
              <PlusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
            </td>
            <td className="border relative md:py-4 py-2 md:text-base text-sm">
              <span>0</span>
              <MinusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
            </td>
            <td className="border relative md:py-4 py-2 md:text-base text-sm">
              <span>무료배송</span>
              <Circle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
              <CircleEqual className="text-black  absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
            </td>
            <td className="border border-r-0 relative md:py-4 py-2 md:text-base text-sm">
              <span className="font-semibold text-dark-red">
                {total.toLocaleString()}
              </span>
            </td>
          </tr>
        </tbody>
      </table> */}
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
