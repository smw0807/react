import { collection, doc, writeBatch } from 'firebase/firestore'

import Button from '@shared/Button'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@/constants/collection'

const FAQ = [
  {
    question: 'MyAccount는 어떤 서비스인가요. 1',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스 입니다. 1',
  },
  {
    question: 'MyAccount는 어떤 서비스인가요. 2',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스 입니다. 2',
  },
  {
    question: 'MyAccount는 어떤 서비스인가요. 3',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스 입니다. 3',
  },
]
function FAQAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    FAQ.forEach((faq) => {
      const faqRef = doc(collection(store, COLLECTIONS.FAQ))
      batch.set(faqRef, faq)
    })
    await batch.commit()
    alert('FAQ 추가 완료!!')
  }
  return <Button onClick={handleButtonClick}>FAQ 추가</Button>
}
export default FAQAddButton
