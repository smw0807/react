import { useQuery } from 'react-query'

import { getEventBanners } from '@remote/banner'

function useEventBanners() {
  return useQuery(
    ['evnet-banners'],
    () => getEventBanners({ hasAccount: false }),
    {
      suspense: true,
    },
  )
}

export default useEventBanners
