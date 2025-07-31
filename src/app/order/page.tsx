import OrderForm from '@/app/order/OrderForm';
import { Suspense } from 'react';

export default function Order() {
  return (
    <Suspense>
      <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <OrderForm />
      </main>
    </Suspense>
  );
}
