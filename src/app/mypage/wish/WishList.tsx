'use client';
import EmptyWish from '@/app/mypage/wish/EmptyWish';
import Loading from '@/app/mypage/wish/Loading';
import WishItem from '@/app/mypage/wish/WishItem';
import { AddCart, deleteLike } from '@/data/actions/cart';
import { getLikeProducts } from '@/data/functions/post';
import { ApiRes, LikeItemType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function WishList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiRes<LikeItemType[]> | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (!accessToken) {
      {
        Swal.fire({
          icon: 'warning',
          text: '로그인 후 이용해주세요',
          confirmButtonText: '확인',
        }).then(result => {
          if (result.isConfirmed) router.replace('/login');
        });
      }
    } else {
      getLikeProducts(accessToken)
        .then(res => {
          console.log('찜 데이터:', res);
          setRes(res);
        })
        .catch(err => {
          console.error('찜 가져오기 실패:', err);
          setRes({ ok: 0, message: '에러 발생!' });
        });
    }
  }, [accessToken]);

  const [addState, addAction, isAdding] = useActionState(AddCart, null);
  console.log(addState, isAdding);
  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteLike,
    null,
  );
  console.log(deleteState, isDeleting);

  useEffect(() => {
    if (deleteState?.ok) {
      if (accessToken) {
        getLikeProducts(accessToken).then(setRes);
      }
    }
  }, [deleteState]);

  useEffect(() => {
    if (addState?.ok) {
      if (accessToken) {
        Swal.fire({
          icon: 'success',
          text: '장바구니에 담겼습니다',
          confirmButtonText: '확인',
        });
      }
    }
  }, [addState]);

  if (!res) {
    return <Loading />;
  }

  if (res.ok && res.item.length === 0) {
    return (
      <div className="h-full">
        <EmptyWish />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {res.ok ? (
        res.item.map((item: LikeItemType) => (
          <WishItem
            key={item._id}
            item={{
              _id: item.product?._id,
              price: item.product?.price,
              name: item.product?.name,
              mainImages: item.product?.mainImages,
              extra: item.product?.extra,
            }}
            action={{
              addAction: addAction,
              deleteAction: deleteAction,
            }}
          />
        ))
      ) : (
        <p>{res.message}</p>
      )}
    </div>
  );
}
