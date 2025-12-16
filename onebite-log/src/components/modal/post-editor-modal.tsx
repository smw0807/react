import { useEffect, useRef, useState } from "react";
import { ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useCreatePost } from "@/hooks/mutations/post/useCreatePost";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSession } from "@/store/session";
import { useOpenAlertModal } from "@/store/alert-modal";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();
  const openAlertModal = useOpenAlertModal();
  const { isOpen, close } = usePostEditorModal();
  const { mutate: createPost, isPending: isCreatingPostPending } =
    useCreatePost({
      onSuccess: () => {
        close();
      },
      onError: (error) => {
        toast.error("포스트 생성에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) {
      images.forEach((image) => {
        // 이미지 미리보기 URL 해제 ,메모리로부터 이미지 삭제
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }
    textareaRef.current?.focus();
    setContent("");
    setImages([]);
  }, [isOpen]);

  const handleCloseModal = () => {
    if (content.trim() !== "" || images.length !== 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다",
        description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
        onPositive: () => {
          close();
        },
      });
      return;
    }
    close();
  };

  const handleCreatePostClick = () => {
    if (content.trim() === "") return;
    openAlertModal({
      title: "게시글 생성",
      description: "게시글을 생성하시겠습니까?",
      onPositive: () => {
        createPost({
          content,
          images: images.map((image) => image.file),
          userId: session!.user.id,
        });
      },
    });
  };

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }
    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prev) =>
      prev.filter((item) => item.previewUrl !== image.previewUrl),
    );
    URL.revokeObjectURL(image.previewUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          ref={textareaRef}
          value={content}
          disabled={isCreatingPostPending}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSelectImages}
        />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      alt={image.file.name}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          disabled={isCreatingPostPending}
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-5 w-5" />
          이미지 추가
        </Button>
        <Button
          className="cursor-pointer"
          onClick={handleCreatePostClick}
          disabled={isCreatingPostPending}
        >
          {isCreatingPostPending ? "저장중..." : "저장"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
