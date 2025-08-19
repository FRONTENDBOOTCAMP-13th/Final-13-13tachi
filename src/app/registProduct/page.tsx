import ProductForm from '@/app/registProduct/ProductForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `상품 등록 - UgVeg: 흙내음 상점`,
    description: `상품 정보를 입력하여 상품을 등록하세요.`,
    openGraph: {
      title: `상품 등록 - UgVeg: 흙내음 상점`,
      description: `상품 정보를 입력하여 상품을 등록하세요.`,
      url: `/registProduct`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default async function RegistProduct() {
  return (
    <Suspense>
      <main className="min-h-[calc(100dvh-26.125rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <ProductForm />
      </main>
    </Suspense>
  );
}
