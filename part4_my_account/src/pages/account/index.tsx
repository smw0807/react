import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'

const Transactions = dynamic(() => import('@/components/account/Transactions'))
const MonthlyChart = dynamic(() => import('@/components/account/MonthlyChart'))

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Transactions />
    </div>
  )
}

function generateMonthlyChartData() {
  const data = []
  for (let i = 1; i <= 12; i++) {
    data.push({
      date: new Date(2025, i, 1).toISOString(),
      balance: Math.floor(Math.random() * (1000000 - 100000) + 100000),
    })
  }
  return data
}

export default withAuth(AccountPage)
