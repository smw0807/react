import EventBannerAddButton from '@components/test/EventBannerAddButton'
import CardListAddButton from '@components/test/CardListAddButton'
import EventForm from '@components/test/EventForm'

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
    </Flex>
  )
}

export default Test
