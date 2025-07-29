'use client';

import { Circle, CircleEqual, MinusCircle, PlusCircle } from 'lucide-react';

interface OrderTableType {
  total: number;
}

export default function OrderTable({ total }: OrderTableType) {
  return (
    <table className="w-full text-center border-collapse table-fixed mb-10">
      <thead>
        <tr>
          <th className="border border-l-0 py-3 bg-disable-gray font-normal">
            주문 금액
          </th>
          <th className="border py-3 bg-disable-gray font-normal">
            적립금 사용
          </th>
          <th className="border py-3 bg-disable-gray font-normal">배송비</th>
          <th className="border border-r-0 py-3 bg-disable-gray font-normal">
            결제 예상 금액
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-l-0 relative py-4">
            <span>{total.toLocaleString()}</span>
            <PlusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </td>
          <td className="border relative py-4">
            <span className="font-semibold">0</span>
            <MinusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </td>
          <td className="border relative py-4">
            <span className="font-semibold">무료배송</span>
            <Circle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
            <CircleEqual className="text-black  absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </td>
          <td className="border border-r-0 relative py-4">
            <span className="font-semibold text-dark-red">
              {total.toLocaleString()}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
