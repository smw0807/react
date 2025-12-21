import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/mutations/post/useDeletePost";
import { useOpenAlertModal } from "@/store/alert-modal";
import { toast } from "sonner";

export default function DeletePostButton({ postId }: { postId: number }) {
  const openAlertModal = useOpenAlertModal();

  const { mutate: deletePost, isPending: isDeletingPostPending } =
    useDeletePost({
      onSuccess: () => {
        toast.success("포스트 삭제에 성공했습니다.");
      },
      onError: (error) => {
        toast.error("포스트 삭제에 실패했습니다.");
      },
    });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "삭제된 포스트는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(postId);
      },
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      disabled={isDeletingPostPending}
      onClick={handleDeleteClick}
    >
      삭제
    </Button>
  );
}
