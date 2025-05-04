import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

import { getCard } from '@remote/card'

import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Review from '@components/card/Review'

import useUser from '@hooks/auth/useUser'
import { useAlertContext } from '@contexts/AlertContext'

function CardPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const user = useUser()
  const { open } = useAlertContext()

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '', // id가 ''가 아니면 호출하겠다.
  })

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate('/signin')
        },
      })
      return
    }
    navigate(`/apply/${id}`)
  }, [user])

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
            <motion.li
              key={index}
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 0.1],
                delay: index * 0.1,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
            >
              <ListRow
                as="div"
                key={index}
                left={<IconCheck />}
                content={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subtitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <TermsContainer direction="column">
          <Text bold>유의 사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion?.terms)}</Text>
        </TermsContainer>
      ) : null}

      <Spacing size={1000} />

      <Review />

      <Spacing size={100} />
      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={moveToApply}
      />
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
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

const TermsContainer = styled(Flex)`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default CardPage
