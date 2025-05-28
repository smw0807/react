import Image from 'next/image'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function Account() {
  const hasAccount = true

  if (hasAccount) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              회원님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t3" bold>
              7,000,000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }

  const 계좌개설상태 = 'READY'
  const title =
    계좌개설상태 === 'READY'
      ? '만들고 있으신\n계좌가 있으시군요'
      : '계좌 개설이\n더 쉽고 빨라졌어요'
  const buttonLabel =
    계좌개설상태 === 'READY' ? '이어만들기' : '3분만에 개설하기'
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text bold style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-64.png"
          alt="account"
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}

export default Account
