import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'
import Spacing from '@shared/Spacing'

const Transactions = dynamic(() => import('@/components/account/Transactions'))
const MonthlyChart = dynamic(() => import('@/components/account/MonthlyChart'))
const CategoryPieChart = dynamic(
  () => import('@/components/account/CategoryPieChart'),
)

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Spacing size={20} />
      <CategoryPieChart chartData={generatePieChartData()} />
      <Spacing size={20} />
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

function generatePieChartData() {
  return ['카페', '쇼핑', '여행', '커피'].map((category) => ({
    category,
    amount: Math.floor(Math.random() * (100000 - 10000 + 1) + 100000),
  }))
}

export default withAuth(AccountPage)
