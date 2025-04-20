import { collection, doc, writeBatch } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { adBanners } from '@mock/data'
import { COLLECTIONS } from '@constants'

import Button from '@shared/Button'

function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))

      batch.set(docRef, banner)
    })
    await batch.commit()

    alert('카드 리스트 추가완료')
  }
  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>
}
export default AdBannerListAddButton
