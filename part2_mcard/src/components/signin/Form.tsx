import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { colors } from '@styles/colorPalette'
import { FormValues } from '@models/signin'
import validator from 'validator'
import styled from '@emotion/styled'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

interface FormProps {
  onSubmit: (formValues: FormValues) => void
}
function Form({ onSubmit }: FormProps) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한가 = Object.keys(errors).length === 0
  return (
    <FormContainer direction="column">
      <TextField
        label="이메일"
        name="email"
        placeholder="abc@gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        onChange={handleFormValues}
        value={formValues.password}
      />
      <Spacing size={32} />
      <Button
        size="large"
        disabled={제출가능한가 === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>

      <Spacing size={12} />
      <LinkStyles to="/signup">
        <Text typography="t6">아직 계정이 없으신가요?</Text>
      </LinkStyles>
    </FormContainer>
  )
}

const FormContainer = styled(Flex)`
  padding: 24px;
`
const LinkStyles = styled(Link)`
  text-align: center;
  & > span:hover {
    color: ${colors.blue};
  }
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  return errors
}

export default Form
