import styled from '@emotion/styled'
import Flex from './Flex'
import Text from '@shared/Text'

interface TopProps {
  title: string
  subtitle: string
}
function Top({ title, subtitle }: TopProps) {
  return (
    <Container direction="column">
      <Text bold={true} typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subtitle}</Text>
    </Container>
  )
}

const Container = styled(Flex)`
  padding: 24px;
`
export default Top
