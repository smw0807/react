import {
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
  signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function SignInPage({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}) {
  return (
    <div>
      <Flex direction="column" align="center">
        <Text bold>My Account</Text>
        <Spacing size={80} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                {provider.name} LOGIN
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  console.log('providers : ', providers)

  return {
    props: {
      providers,
    },
  }
}
export default SignInPage
