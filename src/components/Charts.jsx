import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Box, Typography } from '@mui/material'
import { useExpense } from '../contexts/ExpenseContext'
import { styles } from '../styles'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Charts() {
  const { expenses } = useExpense()
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  )

  const chartData = {
    labels: sortedExpenses.map(exp => new Date(exp.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Transaction Amount (₹)',
        data: sortedExpenses.map(exp => exp.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction History'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)'
        }
      }
    }
  }

  return (
    <Box sx={styles.chartContainer}>
      <Typography variant="h5" gutterBottom>Expense History</Typography>
      <Line data={chartData} options={options} />
    </Box>
  )
}