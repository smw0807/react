import { useCallback, useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'

import useLike from '@hooks/like/useLike'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'
import { useAlertContext } from '@/contexts/AlertContext'

function useEditLike() {
  const { open } = useAlertContext()
  const client = useQueryClient()
  const { data = [] } = useLike()

  const [isEdit, setIsEdit] = useState(false)
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data)
    }
  }, [data])

  const reorder = useCallback(
    (from: number, to: number) => {
      setIsEdit(true)
      setUpdatedLikes((prev) => {
        const newItems = [...data]

        const [fromItem] = newItems.splice(from, 1)
        if (fromItem != null) {
          newItems.splice(to, 0, fromItem)
        }

        newItems.forEach((item, index) => {
          item.order = index + 1
        })
        return newItems
      })
    },
    [data],
  )

  const save = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueriesData(['likes'], updatedLikes)
      setUpdatedLikes([])
      setIsEdit(false)
    } catch (error) {
      console.error(error)
      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          setUpdatedLikes([])
        },
      })
    }
  }

  return {
    data: isEdit ? updatedLikes : data,
    isEdit,
    reorder,
    save,
  }
}

export default useEditLike
