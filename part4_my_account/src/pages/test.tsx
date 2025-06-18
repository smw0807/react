import EventBannerAddButton from '@components/test/EventBannerAddButton'
import CardListAddButton from '@components/test/CardListAddButton'
import EventForm from '@components/test/EventForm'
import TransactionForm from '@components/test/TransactionForm'
import FAQAddButton from '@components/test/FAQAddButton'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

function Test() {
  return (
    <Flex direction="column">
      <Text bold>배너</Text>
      <EventBannerAddButton />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold>카드 리스트</Text>
      <CardListAddButton />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold>이벤트 폼</Text>
      <EventForm />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold>입출금 테스트</Text>
      <TransactionForm />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold>FAQ 추가</Text>
      <FAQAddButton />
    </Flex>
  )
}

export default Test
