import { productAddLike, productDeleteLike } from '@/data/actions/product';
import { ApiRes, LikeItemType, ProductTypeRes, User } from '@/types';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import Swal from 'sweetalert2';

export default function LikesForm({
  isLike,
  accessToken,
  likeRes,
  productRes,
  handleLikeChange,
  user,
}: {
  isLike: boolean;
  accessToken: string;
  likeRes: ApiRes<LikeItemType[] | null>;
  productRes: ProductTypeRes;
  handleLikeChange: (newIsLike: boolean) => void;
  user: User | null;
}) {
  const router = useRouter();

  const [, likeDeleteAction] = useActionState(productDeleteLike, null);
  const [, likeAddAction] = useActionState(productAddLike, null);

  const currentLike = likeRes
    ? Object.values(likeRes).find(
        item => item?.product?._id === productRes.item._id,
      )
    : null;

  console.log(isLike, !isLike);
  console.log('currentLike', currentLike);

  return (
    <>
      {/* ST: 찜하기 */}
      <form
        action={formData => {
          if (!user) {
            // user가 없으면 아무 동작도 하지 않음 (form submit 방지)
            return;
          }
          if (isLike) {
            likeDeleteAction(formData);
            handleLikeChange(false);
          } else {
            likeAddAction(formData);
            handleLikeChange(true);
          }
        }}
        className="leading-1"
      >
        <input type="hidden" name="accessToken" value={accessToken ?? ''} />
        <input type="hidden" name="_id" value={productRes.item._id} />
        {currentLike && (
          <input type="hidden" name="like_id" value={currentLike._id} />
        )}
        <button
          onClick={e => {
            e.stopPropagation();
            if (!user) {
              e.preventDefault();
              Swal.fire({
                icon: 'warning',
                text: '로그인 후 이용해주세요',
                confirmButtonText: '확인',
              }).then(result => {
                if (result.isConfirmed) router.replace('/login');
              });
            }
          }}
          className="cursor-pointer"
        >
          {isLike ? (
            <Heart strokeWidth={1} fill="#000" className="w-5 h-5" />
          ) : (
            <Heart strokeWidth={1} className="w-5 h-5" />
          )}
        </button>
      </form>
      {/* ST: 찜하기 */}
    </>
  );
}
