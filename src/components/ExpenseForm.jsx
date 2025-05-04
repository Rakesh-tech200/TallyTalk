import { useState } from 'react'
import { TextField, Button, MenuItem, Box } from '@mui/material'
import { useExpense } from '../contexts/ExpenseContext'
import { styles } from '../styles'

const categories = ['salary', 'food', 'transport', 'shopping', 'other']

export default function ExpenseForm() {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [description, setDescription] = useState('')
  const { addExpense } = useExpense()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount || !description) return
    
    addExpense({
      amount: parseFloat(amount),
      category,
      description,
    })
    setAmount('')
    setDescription('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        fullWidth
      />
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      >
        {categories.map(cat => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Add Transaction
      </Button>
    </Box>
  )
}