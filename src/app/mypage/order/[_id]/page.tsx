import OrderInfo from '@/app/mypage/order/[_id]/OrderInfo';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: InfoPageProps): Promise<Metadata> {
  const { _id } = await params;
  return {
    title: `주문 상세 내역 #${_id} - UgVeg: 흙내음 상점`,
    description: `주문번호 #${_id}의 상세 내역을 확인하세요.`,
    openGraph: {
      title: `주문 상세 내역 #${_id} - UgVeg: 흙내음 상점`,
      description: `주문번호 #${_id}의 상세 내역을 확인하세요.`,
      url: `/mypage/order/${_id}`,
      images: {
        url: '/UgVeg.png',
      },
    },
  };
}

interface InfoPageProps {
  params: Promise<{
    _id: number;
  }>;
}

export default async function OrderInfoPage({ params }: InfoPageProps) {
  const _id = (await params)._id;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 mb-[1.875rem]">
        <h3 className="w-full text-xl font-semibold">주문 상세 내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <OrderInfo orderId={_id} />
    </div>
  );
}
