import Button from '@/components/common/Button';
import { AddCart } from '@/data/actions/cart';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import Swal from 'sweetalert2';

interface AddCartForm {
  accessToken: string;
  id: number;
  quantity: number;
  user: User | null;
}

export default function AddCartForm({
  accessToken,
  id,
  quantity,
  user,
}: AddCartForm) {
  const router = useRouter();

  // 장바구니 추가 요청
  const [, addCartAction] = useActionState(AddCart, null);

  return (
    <form
      action={formData => {
        if (!user) {
          // user가 없으면 아무 동작도 하지 않음 (form submit 방지)
          return;
        }
        addCartAction(formData);
      }}
    >
      <input type="hidden" name="accessToken" value={accessToken ?? ''} />
      <input type="hidden" name="product_id" value={id} />
      <input type="hidden" name="quantity" value={quantity} />
      <Button
        variant="green"
        size="xxl"
        onClick={() => {
          if (user) {
            Swal.fire({
              icon: 'success',
              text: '장바구니에 담겼습니다',
              confirmButtonText: '확인',
            });
          } else {
            Swal.fire({
              icon: 'warning',
              text: '로그인 후 이용해주세요',
              confirmButtonText: '확인',
            }).then(result => {
              if (result.isConfirmed) router.replace('/login');
            });
          }
        }}
      >
        장바구니 담기
      </Button>
    </form>
  );
}
