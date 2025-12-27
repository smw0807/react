import CommentEditor from "@/components/post/comment/comment-editor";
import CommentList from "@/components/post/comment/comment-list";
import PostItem from "@/components/post/post-item";
import { Navigate, useParams } from "react-router";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId;
  if (!postId) return <Navigate to={"/"} replace={true} />;

  return (
    <div className="flex flex-col gap-5">
      <PostItem postId={Number(postId)} type="DETAIL" />
      <div className="text-xl font-bold">댓글</div>
      <CommentEditor type="CREATE" postId={Number(postId)} />
      <CommentList postId={Number(postId)} />
    </div>
  );
}
