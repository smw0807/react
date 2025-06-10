import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import withAuth from '@/hooks/withAuth'
import ProgressBar from '@shared/ProgressBar'
import FullPageLoader from '@shared/FullPageLoader'

import Terms from '@/components/account/Terms'
import Form from '@/components/account/Form'

import { getTerms, setTerms, createAccount, getAccount } from '@/remote/account'
import useUser from '@/hooks/useUser'
import { User } from '@/models/user'
import { Account } from '@/models/account'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})
// 0 = 약관동의
// 1 = 계좌 개설 홈 페이지
// 2 = 완료페이지
const LAST_STEP = 2
function AccountNew() {
  const [step, setStep] = useState(0)
  const user = useUser()
  const router = useRouter()

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 && (
        <Terms
          onNext={async (termIds) => {
            await setTerms({ userId: user?.id as string, termIds })
            setStep(step + 1)
          }}
        />
      )}
      {step === 1 && (
        <Form
          onNext={async (formValues) => {
            console.log(formValues)
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'READY',
              userId: user?.id as string,
            } as Account
            await createAccount(newAccount)
            setStep(step + 1)
          }}
        />
      )}

      {step === 2 && (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었어요." />
          <FixedBottomButton
            label="확인"
            onClick={() => {
              router.push('/')
            }}
          />
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  const agreedTerms = await getTerms((session?.user as User).id)
  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  const account = await getAccount((session?.user as User).id)
  if (account == null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 2,
    },
  }
}

export default withAuth(AccountNew)
