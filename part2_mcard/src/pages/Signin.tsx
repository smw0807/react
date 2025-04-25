import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { FirebaseError } from '@firebase/app'
import { auth } from '@remote/firebase'

import { FormValues } from '@models/signin'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import { useAlertContext } from '@contexts/AlertContext'

import Form from '@components/signin/Form'
function Signin() {
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    try {
      const { email, password } = formValues
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (e) {
      // firebase 에러
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/wrong-password') {
          open({
            title: '계정의 정보를 확인해주세요',
            onButtonClick: () => {},
          })
          return
        }
      }

      open({
        title: '잠시 후 다시 확인해주세요.',
        onButtonClick: () => {},
      })
    }
  }, [])
  return <Form onSubmit={handleSubmit} />
}
export default Signin
