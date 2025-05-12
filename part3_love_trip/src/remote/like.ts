import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  limit,
  setDoc,
  doc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants'
import { Like } from '@models/like'
import { Hotel } from '@models/hotel'

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      orderBy('order', 'asc'),
    ),
  )

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'id' | 'name' | 'mainImageUrl'>
  userId: string
}) {
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  if (findSnapshot.docs.length > 0) {
    const removeTarget = findSnapshot.docs[0]
    const removeTargetOrder = removeTarget.data().order

    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    if (updateTargetSnapshot.empty) {
      return await deleteDoc(removeTarget.ref)
    } else {
      const batch = writeBatch(store)

      updateTargetSnapshot.docs.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })
      await batch.commit()
      return await deleteDoc(removeTarget.ref)
    }
  } else {
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    )

    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order

    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImageUrl: hotel.mainImageUrl,
      userId,
    }

    const likeRef = doc(collection(store, COLLECTIONS.LIKE))
    return await setDoc(likeRef, newLike)
  }
}

export async function updateOrder(likes: Like[]) {
  const batch = writeBatch(store)

  likes.forEach((like) => {
    batch.update(doc(store, COLLECTIONS.LIKE, like.id), {
      order: like.order,
    })
  })

  return await batch.commit()
}
