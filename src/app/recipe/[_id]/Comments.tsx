import Comment from './Comment';
import { getReplies } from '@/data/functions/recipe';
import CommentNew from '@/app/recipe/[_id]/CommentNew';
import { PostReply } from '@/types/recipe';

interface CommentsProps {
  postId: number;
}

export default async function Comments({ postId }: CommentsProps) {
  const res = await getReplies(Number(postId));

  return (
    <div className="mt-15">
      <div className="flex items-center border-b-2 border-[#DEDEDE]">
        <h3 className="lg:text-xl md:text-lg font-semibold mb-2">댓글</h3>
        {res.ok ? (
          <span className="lg:text-xl md:text-lg font-semibold text-[#67913C] ml-2 mb-2">
            {res.item.length}
          </span>
        ) : (
          <span></span>
        )}
      </div>

      {res.ok ? (
        res.item.map((reply: PostReply) => (
          <Comment key={reply._id} reply={reply} />
        ))
      ) : (
        <p>{res.message}</p>
      )}

      <CommentNew postId={postId} />
    </div>
  );
}
