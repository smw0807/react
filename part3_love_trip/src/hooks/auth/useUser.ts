import { useRecoilValue } from 'recoil'
import { userAtom } from '@store/user'

function useUser() {
  return useRecoilValue(userAtom)
}

export default useUser
