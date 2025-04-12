import { ComponentProps, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

import Modal from '@shared/Modal'

type ModalProps = ComponentProps<typeof Modal>
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (options: ModalOptions) => void
  close: () => void
}
/**
 * context API는 계속 상태가 업데이트되면서 하위에 있는 자식들은 다 렌더링 시켜버리는 특성이 있어서 성능에 좋지 않음
 * 그래서 useCallback을 사용해서 렌더링을 방지해야 함
 */
const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValues: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}

export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalProps>(defaultValues)

  const $potal_root = document.getElementById('root-portal')

  const open = (options: ModalOptions) => {
    setModalState({ ...options, open: true })
  }

  const close = () => {
    setModalState(defaultValues)
  }

  const values = {
    open,
    close,
  }

  return (
    <Context.Provider value={values}>
      {children}
      {$potal_root && createPortal(<Modal {...modalState} />, $potal_root)}
    </Context.Provider>
  )
}

export function useModalContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('ModalContext 안에서 사용해주세요')
  }

  return values
}
