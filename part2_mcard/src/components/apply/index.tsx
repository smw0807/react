import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues } from '@models/apply'
function Apply({ step, onSubmit }: { step: number; onSubmit: () => void }) {
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log(terms)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log(infoValues)
  }

  const handleCardInfo = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    console.log(cardInfoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo onNext={handleCardInfo} />}
    </div>
  )
}

export default Apply
