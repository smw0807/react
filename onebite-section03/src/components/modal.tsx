'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import style from './modal.module.css';

export default function Modal({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);
  return createPortal(
    <dialog
      ref={dialogRef}
      className={style.modal}
      onClick={(e) => {
        //모달의 배경이 클릭되면 뒤로가기
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      onClose={() => router.back()}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}
