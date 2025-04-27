import { MouseEvent, useCallback, useState } from 'react'
import FixedBottomButton from '@shared/FixedBottomButton'
import { ApplyValues } from '@models/apply'
import Agreement from '@shared/Agreement'

import { 약관목록 } from '@constants/apply'

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const isAllAgreed = Object.values(termsAgreements).every(
    (agreement) => agreement,
  )

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prev) => {
        return Object.keys(prev).reduce(
          (acc, key) => ({
            ...acc,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={isAllAgreed} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id as keyof typeof termsAgreements]}
            onChange={(_, checked) => {
              setTermsAgreements((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!isAllAgreed}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
