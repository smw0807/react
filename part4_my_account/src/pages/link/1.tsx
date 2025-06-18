import { useRouter } from 'next/router'

import Spacing from '@shared/Spacing'
import { useEffect } from 'react'

function Link1Page() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/link/2')
  }
  useEffect(() => {
    console.log('Link1Page')
    router.prefetch('/link/2')
  }, [router])
  return (
    <div>
      {/* <Spacing size={1000} /> */}
      <div onClick={handleClick}>Link2</div>
    </div>
  )
}
export default Link1Page
