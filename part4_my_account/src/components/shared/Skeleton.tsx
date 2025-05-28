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

const Skeleton = styled.div<{
  width: number | string
  height: number | string
}>(({ width, height }) => ({
  width,
  height,
  backgroundColor: colors.gray100,
  animation: `${opacity} 1.5s ease-in-out infinite`,
}))

export default Skeleton
