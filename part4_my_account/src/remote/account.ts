import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@/constants/collection'
import { store } from '@remote/firebase'
import { Account } from '@/models/account'

export function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termIds,
  })
}

export async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termIds: string[] }),
  }
}

export function createAccount(newAccount: Account) {
  return setDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), newAccount.userId),
    newAccount,
  )
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  }
}

export async function updateAccountBalance(userId: string, balance: number) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )

  if (!snapshot.exists()) {
    return null
  }

  return updateDoc(snapshot.ref, { balance })
}

export async function updateTerms(userId: string, termsIds: string[]) {
  const snapshot = doc(collection(store, COLLECTIONS.TERMS), userId)

  return updateDoc(snapshot, { termsIds })
}
