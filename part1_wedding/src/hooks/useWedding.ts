import { useQuery } from 'react-query'

import { getWedding } from '@api/wedding'
import { Wedding } from '@/models/wedding'

function useWedding() {
  const { data, isLoading, error } = useQuery<Wedding>(
    ['wedding'],
    () =>
      getWedding().then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return res.json()
      }),
    {
      suspense: true,
    },
  )

  return {
    wedding: data,
    loading: isLoading,
    error,
  }
}

export default useWedding
