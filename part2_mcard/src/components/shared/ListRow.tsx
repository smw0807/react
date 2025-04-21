import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
interface ListRowProps {
  left?: React.ReactNode
  content: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
}

function ListRow({
  left,
  content,
  right,
  withArrow,
  onClick,
  as = 'li',
}: ListRowProps) {
  return (
    <ListRowContainer as={as} onClick={onClick}>
      <ListRowLeftContainer>{left}</ListRowLeftContainer>
      <ListRowContentContainer>{content}</ListRowContentContainer>
      <Flex>{right}</Flex>
      {withArrow && <IconArrowRight />}
    </ListRowContainer>
  )
}

const ListRowContainer = styled(Flex)`
  padding: 8px 24px;
  align-items: center;
`

const ListRowLeftContainer = styled(Flex)`
  margin-right: 14px;
`

const ListRowContentContainer = styled(Flex)`
  flex: 1;
`

function ListRowTexts({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}

ListRow.Texts = ListRowTexts

function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

export default ListRow
