import Image from 'next/image';

// 임시 이미지 불러오기

import Button from '@/components/common/Button';
import { ProductItemType } from '@/types';
import useUserStore from '@/zustand/useStore';
import CustomLink from '@/components/common/CustomLink';

interface BuyItemActionProps {
  addAction: (FormData: FormData) => void;
}

export default function BuyItem({
  item,
  action,
}: {
  item: ProductItemType;
  action: BuyItemActionProps;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useUserStore();

  console.log('전체', item);
  console.log('아이디', item._id);
  console.log('이미지', item.image);

  console.log('3번 호출');
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
        <Image
          width={100}
          height={100}
          src={`${API_URL}/${item.image?.path}`}
          alt={`${item.name} 이미지`}
          className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
        ></Image>
        <div className="flex flex-col justufy-center lg:gap-2">
          <p>
            <span className="lg:text-base font-semibold text-dark-green mr-2.5">
              {item.name}
            </span>
            <span className="lg:text-xs">({item.extra?.details})</span>
          </p>
          <p className="flex gap-2.5 items-center">
            <span className="lg:text-base">
              {item.price.toLocaleString()}원
            </span>
            <span className="lg:text-xs">{item.quantity}개</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end lg:gap-2">
        <form>
          <input
            type="hidden"
            name="accessToken"
            value={user?.token?.accessToken ?? ''}
          />
          <input type="hidden" name="_id" value={item._id} />
          <CustomLink href="/recipe/write" size="lg" variant="green">
            레시피 작성하기
          </CustomLink>
        </form>
        <form action={action.addAction}>
          <input
            type="hidden"
            name="accessToken"
            value={user?.token?.accessToken ?? ''}
          />
          <input type="hidden" name="product_id" value={item._id} />
          <input type="hidden" name="quantity" value={+1} />
          <Button size="lg" variant="white">
            장바구니 담기
          </Button>
        </form>
      </div>
    </div>
  );
}
