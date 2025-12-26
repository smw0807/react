import { fetchInfinitePosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePostData(authorId?: string) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useInfiniteQuery({
    queryKey: !authorId
      ? QUERY_KEYS.post.list
      : QUERY_KEYS.post.userList(authorId),
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchInfinitePosts({
        from,
        to,
        userId: userId!,
        authorId,
      });
      posts.forEach((post) => {
        // 개별적으로 데이터 캐싱
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });
      // return posts;
      return posts.map((post) => post.id);
    },
    initialPageParam: 0,
    // 다음 페이지 번호를 계산하기 위한 함수? 스크롤 최하단까지 내려가서 다음 페이지를 불러올 때 사용됨
    // lastPage: 현재 페이지의 데이터
    // allPages: 이전 페이지까지의 모든 데이터 [[...] [...] [...]]
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    // 데이터를 캐싱할 시간
    staleTime: Infinity, // 무한대로 캐싱
  });
}
