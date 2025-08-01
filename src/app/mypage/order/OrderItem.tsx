import Image from 'next/image';
import Button from '@/components/common/Button';
import { ProductItemType } from '@/types';
import useUserStore from '@/zustand/useStore';
import CustomLink from '@/components/common/CustomLink';
import Link from 'next/link';

interface BuyItemActionProps {
  addAction: (FormData: FormData) => void;
}

export default function OrderItem({
  item,
  action,
}: {
  item: ProductItemType;
  action: BuyItemActionProps;
}) {
  const { user } = useUserStore();

  return (
    <div className="flex md:flex-row md:justify-between flex-col w-full gap-5">
      <div className="flex flex-row items-center gap-3.5">
        <Link
          href={`/shopping/${item._id}`}
          className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 overflow-hidden rounded-lg"
        >
          <Image
            width={100}
            height={100}
            src={item.image.path}
            alt={`${item.name} 이미지`}
            className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 object-cover rounded-lg shadow-image transition-transform duration-300 hover:scale-110"
          ></Image>
        </Link>
        <div className="flex flex-col justufy-center gap-2">
          <Link href={`/shopping/${item._id}`}>
            <span className="md:text-base text-sm font-semibold text-dark-green mr-2.5">
              {item.name}
            </span>
            <span className="text-xs">({item.extra?.details})</span>
          </Link>
          <p className="flex gap-2.5 items-center">
            <span className="md:text-base text-sm">
              {item.price.toLocaleString()}원
            </span>
            <span className="md:text-xs text-2xs">{item.quantity}개</span>
          </p>
        </div>
      </div>
      <div className="flex md:flex-col md:justify-center md:items-end justify-around gap-2">
        <input
          type="hidden"
          name="accessToken"
          value={user?.token?.accessToken ?? ''}
        />
        <input type="hidden" name="_id" value={item._id} />
        <CustomLink href="/recipe/write" size="xxs" variant="green">
          레시피 작성하기
        </CustomLink>
        <form action={action.addAction}>
          <input
            type="hidden"
            name="accessToken"
            value={user?.token?.accessToken ?? ''}
          />
          <input type="hidden" name="product_id" value={item._id} />
          <input type="hidden" name="quantity" value={+1} />
          <Button size="xxs" variant="white">
            장바구니 담기
          </Button>
        </form>
      </div>
    </div>
  );
}
