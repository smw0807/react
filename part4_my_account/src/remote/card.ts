import {
  QuerySnapshot,
  query,
  collection,
  startAfter,
  limit,
  getDocs,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { Card } from '@/models/card'
import { COLLECTIONS } from '@/constants/collection'

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        )

  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}
