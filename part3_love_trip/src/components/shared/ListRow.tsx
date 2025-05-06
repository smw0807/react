import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

interface ListRowProps {
  left?: React.ReactNode
  content: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  style?: SerializedStyles
}

function ListRow({
  left,
  content,
  right,
  withArrow,
  onClick,
  as = 'li',
  style,
}: ListRowProps) {
  return (
    <ListRowContainer as={as} onClick={onClick} css={style}>
      {left && <ListRowLeftContainer>{left}</ListRowLeftContainer>}
      <ListRowContentContainer>{content}</ListRowContentContainer>
      {right && <Flex>{right}</Flex>}
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
  title: React.ReactNode
  subtitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}

function ListRowSkeleton() {
  return (
    <ListRowContainer as="li">
      <ListRowLeftContainer></ListRowLeftContainer>
      <ListRowContentContainer>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subtitle={<Skeleton width={85} height={20} />}
        />
      </ListRowContentContainer>
      <IconArrowRight />
    </ListRowContainer>
  )
}

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

ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton
export default ListRow
