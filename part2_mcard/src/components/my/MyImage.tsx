import { ChangeEvent, useCallback } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { app, storage, store } from '@remote/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'

import { COLLECTIONS } from '@constants'

import styled from '@emotion/styled'

import useUser from '@hooks/auth/useUser'
import { userAtom } from '@atoms/user'

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const defaultImageUrl =
    'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-64.png'

  const handleUploadImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files

      const currentUser = getAuth(app).currentUser

      if (files == null || user == null || currentUser == null) return

      const fileName = files[0].name
      const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

      const uploaded = await uploadBytes(storageRef, files[0])
      console.log(uploaded)
      const downloadUrl = await getDownloadURL(uploaded.ref)
      console.log(downloadUrl)

      await updateProfile(currentUser, {
        photoURL: downloadUrl,
      })

      await updateDoc(doc(store, COLLECTIONS.USER, currentUser.uid), {
        photoURL: downloadUrl,
      })

      setUser({
        ...user,
        photoURL: downloadUrl,
      })
    },
    [],
  )
  return (
    <Container>
      <img
        src={user?.photoURL || defaultImageUrl}
        alt="프로필 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
