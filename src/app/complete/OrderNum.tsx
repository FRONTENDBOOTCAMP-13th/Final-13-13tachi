'use client';

import { useSearchParams } from 'next/navigation';

export default function OrderNum() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum') ?? '';
  return (
    <p className="text-sm font-bold text-light-green ">주문번호: {orderNum}</p>
  );
}
