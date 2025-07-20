'use server';

import { revalidatePath } from 'next/cache';

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
  } catch (err) {
    console.error(err);
    return;
  }
}
