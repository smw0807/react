import { usePostsData } from "@/hooks/queries/usePostsData";
import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
// npm i react-interecption-observer
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostData } from "@/hooks/queries/useInfinitePostData";

export default function PostFeed() {
  // const { data, error, isPending } = usePostsData();
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostData();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {/* {data.map((post) => (
        <PostItem key={post.id} {...post} />
      ))} */}
      {data.pages.map((page) =>
        page.map((post) => <PostItem key={post.id} {...post} />),
      )}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
