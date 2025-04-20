import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from '@emotion/styled'
import { getCard } from '@remote/card'

import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

function CardPage() {
  const { id = '' } = useParams()

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '', // id가 ''가 아니면 호출하겠다.
  })

  console.log(data)
  if (!data) return null

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subtitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <ListRow
              key={index}
              left={<IconCheck />}
              content={
                <ListRow.Texts title={`혜택 ${index + 1}`} subtitle={text} />
              }
            />
          )
        })}
      </ul>

      {promotion != null ? (
        <TermsContainer direction="column">
          <Text bold>유의 사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion?.terms)}</Text>
        </TermsContainer>
      ) : null}
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        fill="#6563ff"
      />
    </svg>
  )
}

function removeHtmlTags(text: string) {
  let output = ''
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

const TermsContainer = styled(Flex)`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default CardPage
