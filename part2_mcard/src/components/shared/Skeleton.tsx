import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from '@styles/colorPalette'

const opacity = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`

const Skeleton = styled.div<{ width: number; height: number }>(
  ({ width, height }) => ({
    width,
    height,
    backgroundColor: colors.grey,
    animation: `${opacity} 1.5s ease-in-out infinite`,
  }),
)

export default Skeleton
