import { ChangeEvent, useState } from 'react'

import TextField from '@shared/TextField'
import Flex from '@shared/Flex'
import Select from '@shared/Select'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'

import { getAccount, updateAccountBalance } from '@/remote/account'
import { createTransaction } from '@/remote/transaction'
import { Transaction } from '@/models/transaction'

function TransactionForm() {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'diposit',
    amount: '',
    displayText: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)
    if (account == null) {
      window.alert('해당 유저는 계좌를 보유하고 있지 않습니다.')
      return
    }
    if (
      formValues.type === 'diposit' &&
      account.balance - Number(formValues.amount) < 0
    ) {
      window.alert(
        `지금 유저의 잔액은 ${account.balance}원 입니다. 잔액이 0이하가 될 수 없어요`,
      )
      return
    }
    const balance =
      formValues.type === 'diposit'
        ? account.balance + Number(formValues.amount)
        : account.balance - Number(formValues.amount)

    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as Transaction

    const [a, b] = await Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ])

    console.log('a', a)
    console.log('b', b)
    window.alert('입출금 완료')
  }
  return (
    <div>
      <Flex direction="column">
        <TextField
          name="userId"
          label="유저아이디"
          value={formValues.userId}
          onChange={handleChange}
        />
        <Spacing size={8} />
        <Select
          value={formValues.type}
          onChange={(e) =>
            setFormValues({ ...formValues, type: e.target.value })
          }
          options={[
            {
              label: '입금',
              value: 'diposit',
            },
            {
              label: '출금',
              value: 'withdraw',
            },
          ]}
        />
        <Spacing size={8} />
        <TextField
          name="amount"
          label="입출금 금액"
          value={formValues.amount}
          onChange={handleChange}
        />
        <Spacing size={8} />
        <TextField
          name="displayText"
          label="보내는 사람"
          value={formValues.displayText}
          onChange={handleChange}
        />
        <Spacing size={8} />
        <Button onClick={handleSubmit}>
          {formValues.type === 'diposit' ? '입금' : '출금'}
        </Button>
      </Flex>
    </div>
  )
}

export default TransactionForm
