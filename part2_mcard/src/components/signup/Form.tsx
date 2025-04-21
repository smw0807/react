import styled from '@emotion/styled'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'

function Form() {
  return (
    <FormContainer direction="column">
      <TextField label="이메일" placeholder="abc@gmail.com" />
      <Spacing size={16} />
      <TextField label="패스워드" type="password" />
      <Spacing size={16} />
      <TextField label="패스워드 재확인" type="password" />
      <Spacing size={16} />
      <TextField label="이름" placeholder="송민우" />

      <FixedBottomButton label="회원가입" disabled={true} onClick={() => {}} />
    </FormContainer>
  )
}

const FormContainer = styled(Flex)`
  padding: 24px;
`

export default Form
