import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const session = useSession();
  const userId = session?.user.id;
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById({ postId, userId: userId! }),
    // enabled: false, // 기본적으로 데이터를 가져오지 않음, 무조건 캐싱된 데이터를 가져오게 하기 위함
    enabled: type === "FEED" ? false : true,
  });
}
