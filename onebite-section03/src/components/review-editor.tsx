'use client';
import { useActionState, useEffect } from 'react';
import { createReviewAction } from '@/actions/create-review.action';
import style from './review-editor.module.css';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction, //액션함수 첫 번째 파라미터로 state를 던지기 때문에 기존에 작성한 함수를 수정해야함
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          required
          name="content"
          placeholder="리뷰 내용"
          disabled={isPending}
        />
        <div className={style.submit_container}>
          <input
            required
            name="author"
            placeholder="작성자"
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? '작성중...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
