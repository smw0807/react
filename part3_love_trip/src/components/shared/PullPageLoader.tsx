import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'

function PullPageLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          width={120}
          src="https://pixabay.com/ko/gifs/%EB%A1%9C%EC%BC%93-%EC%9A%B0%EC%A3%BC-%EB%B6%80%EC%8A%A4%ED%84%B0-%EC%97%B0%EC%86%8C-6594/"
          alt=""
        />

        {message && (
          <>
            <Spacing size={120} />
            <Text typography="t4" bold>
              {message}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default PullPageLoader
