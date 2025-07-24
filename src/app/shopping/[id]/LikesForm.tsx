import { productAddLike, productDeleteLike } from '@/data/actions/product';
import { ProductTypeRes } from '@/types';
import { Heart } from 'lucide-react';
import { useActionState } from 'react';

export default function LikesForm({
  isLike,
  accessToken,
  productRes,
}: {
  isLike: boolean;
  accessToken: string;
  productRes: ProductTypeRes;
}) {
  const [deleteState, likeDeleteAction, likeDeleteLoading] = useActionState(
    productDeleteLike,
    null,
  );
  const [addState, likeAddAction, likeAddLoading] = useActionState(
    productAddLike,
    null,
  );

  // console.log('addState', addState);
  // console.log('likeAddLoading', likeAddLoading);
  // console.log('deleteState', deleteState);
  // console.log('productRes', productRes);

  return (
    <>
      {/* ST: 찜하기 */}
      <form action={isLike ? likeDeleteAction : likeAddAction}>
        <input type="hidden" name="accessToken" value={accessToken ?? ''} />
        <input type="hidden" name="_id" value={productRes.item._id} />
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
