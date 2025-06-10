import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import withAuth from '@/hooks/withAuth'
import ProgressBar from '@shared/ProgressBar'
import Terms from '@/components/account/Terms'

import { getTerms, setTerms } from '@/remote/account'
import useUser from '@/hooks/useUser'
import { getSession } from 'next-auth/react'
import { User } from '@/models/user'
// 0 = 약관동의
// 1 = 계좌 개설 홈 페이지
// 2 = 완료페이지
const LAST_STEP = 2
function AccountNew() {
  const [step, setStep] = useState(0)
  const user = useUser()

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
  if (agreedTerms != null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }
  return {
    props: { initialStep: 0 },
  }
}

export default withAuth(AccountNew)
