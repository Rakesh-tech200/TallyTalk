import { Container, Grid, Typography } from '@mui/material'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Charts from './components/Charts'
import { styles } from './styles'
import './index.css'

export default function App() {
  return (
    <Container maxWidth="md" sx={styles.container}>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>Add Transaction</Typography>
          <ExpenseForm />
          <ExpenseList />
        </Grid>
        <Grid item xs={12} md={6}>
          <Charts />
        </Grid>
      </Grid>
    </Container>
  )
}