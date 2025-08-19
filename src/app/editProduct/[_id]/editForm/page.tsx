import ProductEditForm from '@/app/editProduct/[_id]/editForm/ProductEditForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

interface EditPageProps {
  params: Promise<{
    _id: number;
  }>;
}

export async function generateMetadata({
  params,
}: EditPageProps): Promise<Metadata> {
  const { _id } = await params;
  return {
    title: `상품 정보 수정 - UgVeg: 흙내음 상점`,
    description: `상품 정보 수정을 완료하세요.`,
    openGraph: {
      title: `상품 정보 수정 - UgVeg: 흙내음 상점`,
      description: `상품 정보 수정을 완료하세요..`,
      url: `/editProduct/${_id}/editForm`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
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
