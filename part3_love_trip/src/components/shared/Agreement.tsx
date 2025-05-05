import { MouseEvent } from 'react'
import styled from '@emotion/styled'
import Flex from './Flex'
import Text from './Text'

function Agreement({ children }: { children: React.ReactNode }) {
  return <AgreementContainer direction="column">{children}</AgreementContainer>
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} />
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) {
  return (
    <Flex as="li">
      <Flex
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            <Text typography="t6">링크</Text>
          </a>
        )}
      </Flex>
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

const AgreementContainer = styled(Flex)`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`
function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  if (checked) {
    return (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
      >
        <path
          d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          fill="#6563ff"
        />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
    >
      <defs></defs>
      <title />
      <g data-name="Layer 2" id="Layer_2">
        <path d="M15,21a1,1,0,0,1-.71-.29l-4-4a1,1,0,0,1,1.42-1.42L15,18.59l6.29-6.3a1,1,0,0,1,1.42,1.42l-7,7A1,1,0,0,1,15,21Z" />
        <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" />
      </g>
    </svg>
  )
}
export default Agreement
