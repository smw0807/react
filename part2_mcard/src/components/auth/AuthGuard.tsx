import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { userAtom } from '@atoms/user'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUser({
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
        })
      } else {
        setUser(null)
      }
      setInitialized(true)
    })

    return () => {
      unsubscribe()
    }
  }, [setUser])

  if (!initialized) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
