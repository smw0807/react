import { NextPageContext } from 'next'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Image from 'next/image'

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div>
      <Spacing size={100} />
      <Flex align="center" direction="column">
        <Image
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png"
          width={80}
          height={80}
          alt="error"
        />
        <Spacing size={20} />
        <Text>{statusCode} 에러가 발생했습니다.</Text>
        <Spacing size={100} />
        <Button
          onClick={() => {
            window.history.back()
          }}
        >
          돌아가기
        </Button>
      </Flex>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
export default Error
