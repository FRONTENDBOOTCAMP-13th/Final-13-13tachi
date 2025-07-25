import { CircleEqualIcon, MinusCircle, PlusCircle } from 'lucide-react';

export default function OrderTable() {
  return (
    <table className="w-full text-center border-collapse table-fixed mb-10">
      <thead>
        <tr>
          <th className="border border-l-0 py-3 bg-disable-gray">주문 금액</th>
          <th className="border py-3 bg-disable-gray">적립금 사용</th>
          <th className="border py-3 bg-disable-gray">배송비</th>
          <th className="border border-r-0 py-3 bg-disable-gray">
            결제 예상 금액
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-l-0 relative py-4">
            <span>10000</span>
            <PlusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </td>
          <td className="border relative py-4">
            <span>10000</span>
            <MinusCircle className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </td>
          <td className="border relative py-4">
            <span>10000</span>
            <CircleEqualIcon className="text-black fill-white absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
          </td>
          <td className="border border-r-0 relative py-4">
            <span>10000</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
