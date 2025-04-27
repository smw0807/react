import { forwardRef, SelectHTMLAttributes } from 'react'
import { Option } from '@models/apply'
import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'

import Flex from './Flex'
import Text from './Text'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
}
const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: ${colors.blue};
  }
`

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, value, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          placeholder 속성 사라짐
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

export default Select
