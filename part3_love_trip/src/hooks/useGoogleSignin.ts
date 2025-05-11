import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

import { auth, store } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'
import { FirebaseError } from 'firebase/app'

function useGoogleSignin() {
  const navigate = useNavigate()
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    try {
      const { user } = await signInWithPopup(auth, provider)
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      await setDoc(
        doc(collection(store, COLLECTIONS.USER), newUser.uid),
        newUser,
      )
      navigate('/')
    } catch (e: any) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/popup-closed-by-user') {
          return
        }
      }
      throw new Error('Google 로그인 실패')
    }
  }, [navigate])

  const signout = useCallback(() => {
    signOut(auth)
  }, [])

  return { signin, signout }
}

export default useGoogleSignin
