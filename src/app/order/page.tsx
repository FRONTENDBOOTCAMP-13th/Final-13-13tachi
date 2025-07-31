import OrderForm from '@/app/order/OrderForm';

export default function Order() {
  return (
    <main className="lg:w-[64rem] md:w-[44.25rem] w-80 min-h-[calc(100dvh-20.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <OrderForm />
    </main>
  );
}
