import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { getLikes, toggleLike } from '@remote/like'
import useUser from '@hooks/auth/useUser'
import { Hotel } from '@models/hotel'
import { useAlertContext } from '@contexts/AlertContext'

function useLike() {
  const navigate = useNavigate()
  const user = useUser()
  const { open } = useAlertContext()
  const queryClient = useQueryClient()
  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'id' | 'name' | 'mainImageUrl'> }) => {
      if (user == null) {
        throw new Error('로그인 후 이용해주세요')
      }

      return toggleLike({ hotel, userId: user?.uid as string })
    },
    {
      onSuccess: () => {
        // 찜 목록 캐시 무효화
        queryClient.invalidateQueries(['likes'])
      },
      onError: (e: Error) => {
        if (e.message === '로그인 후 이용해주세요') {
          open({
            title: '로그인이 필요한 기능입니다.',
            onButtonClick: () => {
              navigate('/signin')
            },
          })
          return
        }
        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요.',
          onButtonClick: () => {},
        })
      },
    },
  )
  return {
    data,
    mutate,
  }
}

export default useLike
