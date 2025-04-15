import { useModalContext } from '@contexts/ModalContext'
import { useEffect, useRef } from 'react'
import { Wedding } from '@models/wedding'

function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close } = useModalContext()

  const $input = useRef<HTMLInputElement>(null)

  const haveSeenModal = localStorage.getItem('@have-seen-modal')

  useEffect(() => {
    if (haveSeenModal === 'true') {
      return
    }
    open({
      title: `현재 참석자: ${wedding.attendCount}명`,
      body: (
        <div>
          <input
            ref={$input}
            placeholder="참석 가능 인원을 추가해주세요"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
      ),
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
      onRightButtonClick: async () => {
        if ($input.current == null) {
          return
        }

        await fetch('http://localhost:8888/wedding', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,
            attendCount: wedding.attendCount + Number($input.current.value),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
    })
  }, [open, close, wedding, haveSeenModal])
  /**
   * []안에 open, close를 넣으면 무한 루프에 빠지게 됨
   * 왜냐하면 open, close가 호출될 때마다 모달이 다시 열리기 때문임
   * 하지만 open,과 close를 useCallback으로 선언해서 렌더링을 방지해주면 무한 루프에 빠지지 않음
   */
  return null
}

export default AttendCountModal
