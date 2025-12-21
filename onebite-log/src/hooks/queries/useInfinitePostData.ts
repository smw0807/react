import { fetchInfinitePosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePostData() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchInfinitePosts({ from, to });
      return posts;
    },
    initialPageParam: 0,
    // 다음 페이지 번호를 계산하기 위한 함수? 스크롤 최하단까지 내려가서 다음 페이지를 불러올 때 사용됨
    // lastPage: 현재 페이지의 데이터
    // allPages: 이전 페이지까지의 모든 데이터 [[...] [...] [...]]
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
}
