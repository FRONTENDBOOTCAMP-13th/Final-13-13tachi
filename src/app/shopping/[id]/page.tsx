import DetailInfo from '@/app/shopping/[id]/DetailInfo';

interface shoppingPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function ShoppingDetail({ params }: shoppingPageProps) {
  const { id } = await params;

  return (
    <>
      <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <DetailInfo id={id} />
      </main>
    </>
  );
}
