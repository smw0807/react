import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;
    --yellow: #ffeb3b;
    --purple: #9c27b0;
    --orange: #ff9800;
  }
`

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',
  yellow: 'var(--yellow)',
  purple: 'var(--purple)',
  orange: 'var(--orange)',
}

export type Colors = keyof typeof colors
