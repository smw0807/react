import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { createPortal } from 'react-dom'

import Button from '@shared/Button'
import { colors } from '@styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}

function FixedBottomButton({ label, onClick }: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')
  if (!$portalRoot) return null

  return createPortal(
    <Container>
      <ButtonContainer size="medium" full onClick={onClick}>
        {label}
      </ButtonContainer>
    </Container>,
    $portalRoot,
  )
}

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`
const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`

const ButtonContainer = styled(Button)`
  border-radius: 8px;
`

export default FixedBottomButton
