import ProductEditForm from '@/app/editProduct/[_id]/editForm/ProductEditForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `상품 주문 - UgVeg: 흙내음 상점`,
    description: `결제 정보를 입력하여 주문을 완료하세요.`,
    openGraph: {
      title: `상품 주문 - UgVeg: 흙내음 상점`,
      description: `결제 정보를 입력하여 주문을 완료하세요.`,
      url: `/order`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

interface EditPageProps {
  params: Promise<{
    _id: number;
  }>;
}

export default async function EidtProduct({ params }: EditPageProps) {
  const { _id } = await params;
  // const res = await getSellerProduct(Number(_id));
  return (
    <Suspense>
      <main className="min-h-[calc(100dvh-26.125rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <ProductEditForm key={_id} item={_id} />
      </main>
    </Suspense>
  );
}
