import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getReviews, writeReview, removeReview } from '@remote/review'
import useUser from '@hooks/auth/useUser'
function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        hotelId,
        userId: user?.uid as string,
        text,
        createdAt: new Date(),
      }
      await writeReview(newReview)

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  const { mutateAsync: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )
  return {
    data,
    isLoading,
    write,
    remove,
  }
}

export default useReview
