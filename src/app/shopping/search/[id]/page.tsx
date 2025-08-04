import ShoppingSearchList from '@/app/shopping/search/[id]/ShoppingSearchList';
import { getProducts } from '@/data/functions/product';
import { ProductType } from '@/types';
import { Metadata } from 'next';

interface SearchParams {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: SearchParams): Promise<Metadata> {
  const { id } = await params;
  const decodedQuery = decodeURIComponent(id);

  return {
    title: `"${decodedQuery}" 검색 결과 - UgVeg: 흙내음 상점`,
    description: `"${decodedQuery}"에 대한 상품 검색 결과를 확인하세요.`,
    openGraph: {
      title: `"${decodedQuery}" 검색 결과 - UgVeg: 흙내음 상점`,
      description: `"${decodedQuery}"에 대한 상품 검색 결과를 확인하세요.`,
      url: `/shopping/search/${id}`,
      images: 'https://ugveg.vercel.app/UgVeg.png',
    },
  };
}

export default async function ShoppingSearch() {
  const res = await getProducts();
  const products: ProductType[] = res.ok === 1 ? res.item : [];

  return (
    <>
      <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <ShoppingSearchList products={products} />
      </main>
    </>
  );
}
