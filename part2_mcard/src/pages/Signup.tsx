import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { auth, store } from '@remote/firebase'
import { useNavigate } from 'react-router-dom'

import SignupForm from '@components/signup/Form'
import { FormValues } from '@models/signup'
import { COLLECTIONS } from '@constants'
function Signup() {
  const navigate = useNavigate()

  const handleSubmit = async (formValues: FormValues) => {
    const { email, password } = formValues
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {
      displayName: formValues.name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: formValues.name,
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    navigate('/')
  }

  return (
    <div>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  )
}
export default Signup
