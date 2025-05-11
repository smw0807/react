import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@store/user'
import { User } from '@models/user'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setUser(null)
      } else {
        setUser({
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
        } as User)
      }
      setInitialize(true)
    })

    return () => {
      unsubscribe()
    }
  }, [setUser])

  if (initialize === false) {
    return null
  }
  return <>{children}</>
}

export default AuthGuard
