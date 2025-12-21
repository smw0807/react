import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (data) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      // 이미지 삭제
      if (data.image_urls && data.image_urls.length > 0) {
        await deleteImagesInPath(`${data.author_id}/${data.id}`);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
