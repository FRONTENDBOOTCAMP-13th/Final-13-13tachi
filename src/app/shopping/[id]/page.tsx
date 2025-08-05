import DetailInfo from '@/app/shopping/[id]/DetailInfo';
import { getProductDetails } from '@/data/functions/product';
import { Metadata } from 'next';

interface shoppingPageProps {
  params: Promise<{
    id: number;
  }>;
}

export async function generateMetadata({
  params,
}: shoppingPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product || product.ok === 0) {
    return {
      title: '장보기 - 상품을 찾을 수 없습니다',
      description: '요청하신 상품 정보를 불러올 수 없습니다.',
    };
  }

  const title = product.item.name;

  return {
    title: `${title} - UgVeg: 흙내음 상점`,
    description: `UgVeg에서 판매하는 ${title}의 정보입니다.`,
    openGraph: {
      title: `${title} - UgVeg: 흙내음 상점`,
      description: `UgVeg에서 판매하는 ${title}의 정보입니다.`,
      url: `/shopping/${id}`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default async function ShoppingDetail({ params }: shoppingPageProps) {
  const { id } = await params;

  return (
    <>
      <main className="min-h-[calc(100dvh-26.125rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <DetailInfo id={id} />
      </main>
    </>
  );
}
