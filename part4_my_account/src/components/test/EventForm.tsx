import { ChangeEvent, useCallback, useState } from 'react'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import Preview from '@/components/event/Preview'

function EventForm() {
  const [formValues, setFormValues] = useState({
    title: '',
    subTitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '',
  })

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    },
    [setFormValues],
  )

  const handleSubmit = async () => {
    await setDoc(doc(collection(store, COLLECTIONS.EVENT)), formValues)
    alert('이벤트 정보를 추가했습니다.')
  }

  const isFormValuesValid = !Object.values(formValues).every(
    (value) => value !== '',
  )

  console.log(isFormValuesValid)
  return (
    <Flex direction="column">
      <Flex>
        <Flex style={{ flex: 1 }} direction="column">
          <TextField
            name="title"
            label="이벤트 제목"
            onChange={handleFormValues}
            value={formValues.title}
          />
          <TextField
            name="subTitle"
            label="이벤트 부제목"
            onChange={handleFormValues}
            value={formValues.subTitle}
          />
          <textarea
            style={{ height: 400 }}
            name="contents"
            onChange={handleFormValues}
            value={formValues.contents}
          />
          <TextField
            name="buttonLabel"
            label="버튼명"
            onChange={handleFormValues}
            value={formValues.buttonLabel}
          />
          <TextField
            name="link"
            label="링크"
            onChange={handleFormValues}
            value={formValues.link}
          />
          <TextField
            name="endDate"
            label="이벤트 종료일"
            onChange={handleFormValues}
            value={formValues.endDate}
          />
        </Flex>
        <Flex style={{ flex: 2 }}>
          <Preview data={formValues} mode="edit" />
        </Flex>
      </Flex>

      <Button onClick={handleSubmit} disabled={isFormValuesValid}>
        저장하기
      </Button>
    </Flex>
  )
}

export default EventForm
