import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (data) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      // 이미지 삭제
      if (data.image_urls && data.image_urls.length > 0) {
        await deleteImagesInPath(`${data.author_id}/${data.id}`);
      }
      // 캐시 데이터 초기화
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
