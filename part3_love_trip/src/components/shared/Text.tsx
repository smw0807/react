import { CSSProperties } from 'react'
import { Colors, colors } from '@styles/colorPalette'
import { Typography, typographyMap } from '@styles/typography'

import styled from '@emotion/styled'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    display,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
