import { Button } from "@/components/ui/button";
import { useOpenEditPostModal } from "@/store/post-editor-modal";
import type { PostEntity } from "@/types";

export default function EditPostButton({
  id,
  content,
  image_urls,
}: PostEntity) {
  const openPostEditorModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openPostEditorModal({
      postId: id,
      content: content,
      imageUrls: image_urls || [],
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleButtonClick}
    >
      수정
    </Button>
  );
}
