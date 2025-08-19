'use client';

import { useActionState, useEffect, useState } from 'react';
import { ApiRes, ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import CustomLink from '@/components/common/CustomLink';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Loading from '@/app/mypage/cart/Loading';
import EmptyProduct from '@/app/mypage/product/EmptyProduct';
import { getSellerProducts } from '@/data/functions/product';
import { deleteProduct } from '@/data/actions/product';
import ProductItem from '@/app/mypage/product/productItem';

export default function ProductsList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const router = useRouter();

  const [res, setRes] = useState<ApiRes<ProductType[]> | null>(null);

  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (accessToken) {
      getSellerProducts(accessToken).then(setRes);
    } else {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      }).then(result => {
        if (result.isConfirmed) router.replace('/login');
      });
    }
  }, [accessToken]);

  const [deleteState, deleteAction] = useActionState(deleteProduct, null);

  useEffect(() => {
    if (deleteState?.ok) {
      if (accessToken) {
        getSellerProducts(accessToken).then(setRes);
      }
    }
  }, [deleteState]);

  if (!res) {
    return <Loading />;
  }
  if (res.ok && res.item.length === 0) {
    return (
      <div className="h-full">
        <EmptyProduct />
      </div>
    );
  }

  return (
    <div>
      {res.ok ? (
        res.item.map((item: ProductType) => (
          <ProductItem
            key={item._id}
            item={{
              _id: item._id,
              seller_id: item.seller_id,
              name: item.name,
              quantity: item.quantity,
              buyQuantity: item.buyQuantity,
              price: item.price,
              mainImages: item.mainImages,
              extra: item.extra,
              show: item.show,
              active: item.active,
              bookmarks: item.bookmarks,
            }}
            action={{
              deleteAction: deleteAction,
            }}
          />
        ))
      ) : (
        <p>{}</p>
      )}
      <div className="flex justify-center lg:mt-[4.0625rem] md:mt-8 mt-6">
        <form>
          <CustomLink href="/registProduct">상품 등록하기</CustomLink>
        </form>
      </div>
    </div>
  );
}
