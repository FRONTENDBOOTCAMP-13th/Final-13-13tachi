import Comment from './Comment';
import { getReplies } from '@/data/functions/post';
import CommentNew from '@/app/recipe/[_id]/CommentNew';
import { PostReply } from '@/types/post';

interface CommentsProps {
  postId: number;
}

export default async function Comments({ postId }: CommentsProps) {
  const res = await getReplies(Number(postId));

  return (
    <div className="p-15">
      <div className="flex items-center border-b-2 border-[#DEDEDE]">
        <h3 className="text-xl font-semibold mb-2">댓글</h3>
        {res.ok ? (
          <span className="text-xl font-semibold text-[#67913C] ml-2 mb-2">
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
