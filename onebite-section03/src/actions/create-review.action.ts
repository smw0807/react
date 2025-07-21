'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );
    console.log(response.status);
    // next 서버에게 해당 경로를 다시 생성할 것을 요청함(재검증)
    // 오직 서버측에서만 호출할 수 있음
    // 모든 캐시를 무효화함, 풀 라우트 캐시도 삭제함
    revalidatePath(`/book/${bookId}`);

    // 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath(`/book/[id]`, 'page');

    // 특정 레이아웃을 갖는 모든 페이지를 재검증
    // revalidatePath(`/(with-searchbar)`, 'layout');

    // 모든 데이터를 재검증
    // revalidatePath('/', 'layout');

    // 태그 값을 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    //   {
    //     next: {
    //       tags: [`review-${id}`],
    //     },
    //   }
    // );
  } catch (err) {
    console.error(err);
    return;
  }
}
