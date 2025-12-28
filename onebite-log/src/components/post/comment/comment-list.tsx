import { useCommentsData } from "@/hooks/queries/useCommentsData";
import CommentItem from "./comment-item";
import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import type { Comment, NestedComment } from "@/types";

function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];
  comments.forEach((comment) => {
    if (!comment.parent_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      const parentCommentIndex = result.findIndex(
        (item) => item.id === comment.parent_comment_id,
      );
      result[parentCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment: result[parentCommentIndex],
      });
    }
  });
  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentPending,
  } = useCommentsData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentPending) return <Loader />;

  const nestedComments = toNestedComments(comments);

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
