import { MouseEvent, useCallback, useState } from 'react'

import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import FixedBottomButton from '@shared/FixedBottomButton'

import { ApplyValues } from '@models/apply'

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isHipass: false,
    isMaster: false,
    isRf: false,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement
    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: $button.dataset.value === 'true',
    }))
  }, [])

  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          size="medium"
          weak={isMaster === false}
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          size="medium"
          weak={isMaster === true}
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={16} />

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          size="medium"
          weak={isRf === true}
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          size="medium"
          weak={isRf === false}
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={16} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          size="medium"
          weak={isHipass === true}
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          size="medium"
          weak={isHipass === false}
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton label="다음" onClick={() => onNext(cardInfoValues)} />
    </div>
  )
}

export default CardInfo
