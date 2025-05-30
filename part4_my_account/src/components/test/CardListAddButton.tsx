import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'

import Button from '@shared/Button'
import { COLLECTIONS } from '@constants/collection'
import { card_list } from '@/mock/card'

function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      batch.set(docRef, card)
    })

    await batch.commit()

    alert('카드 추가 완료')
  }
  return (
    <div>
      <Button onClick={handleButtonClick}>카드 추가</Button>
    </div>
  )
}

export default CardListAddButton
