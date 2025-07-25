import { productAddLike, productDeleteLike } from '@/data/actions/product';
import { ApiRes, LikeItemType, ProductTypeRes } from '@/types';
import { Heart } from 'lucide-react';
import { useActionState } from 'react';

export default function LikesForm({
  isLike,
  accessToken,
  likeRes,
  productRes,
  handleLikeChange,
}: {
  isLike: boolean;
  accessToken: string;
  likeRes: ApiRes<LikeItemType[] | null>;
  productRes: ProductTypeRes;
  handleLikeChange: (newIsLike: boolean) => void;
}) {
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
          if (isLike) {
            likeDeleteAction(formData);
            handleLikeChange(false);
          } else {
            likeAddAction(formData);
            handleLikeChange(true);
          }
        }}
      >
        <input type="hidden" name="accessToken" value={accessToken ?? ''} />
        <input type="hidden" name="_id" value={productRes.item._id} />
        {currentLike && (
          <input type="hidden" name="like_id" value={currentLike._id} />
        )}
        <button className="cursor-pointer">
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
