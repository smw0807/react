import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { css } from '@emotion/react'

import { Event } from '@/models/event'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { typographyMap } from '@/styles/typography'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

function Preview({
  data,
  mode = 'preview',
}: {
  data: Event
  mode?: 'preview' | 'edit'
}) {
  const router = useRouter()
  const { title, subTitle, buttonLabel, link, contents } = data
  return (
    <Flex direction="column">
      <Flex style={{ padding: '12px 24px' }} direction="column">
        <Text bold>{title}</Text>
        <Text typography="t6">{subTitle}</Text>
      </Flex>

      <div css={markdownStyles}>
        <ReactMarkdown>{contents}</ReactMarkdown>
      </div>

      {mode === 'preview' && (
        <FixedBottomButton
          label={buttonLabel}
          onClick={() => {
            router.push(link)
          }}
        />
      )}
    </Flex>
  )
}

const markdownStyles = css`
  padding: 24px;
  ${typographyMap.t6};
  h1 {
    ${typographyMap.t3};
    font-weight: bold;
    margin: 24px;
  }
  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 18px;
  }
  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }
  li {
    list-style-type: disc;
  }
  p {
    margin: 18px 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

export default Preview
