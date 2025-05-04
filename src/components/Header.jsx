import { Box, Typography, Button, IconButton, TextField } from '@mui/material'
import { useExpense } from '../contexts/ExpenseContext'
import { Mic, MicOff } from '@mui/icons-material'

export default function Header() {
  const { income, expense, budget, setBudget, listening, startListening } = useExpense()
  
  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>Expense Tracker</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
        <TextField
          label="Monthly Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
          sx={{ width: 200 }}
        />
        <Button 
          variant="contained" 
          color={listening ? 'secondary' : 'primary'}
          onClick={startListening}
          startIcon={listening ? <MicOff /> : <Mic />}
        >
          {listening ? 'Stop Recording' : 'Add by Voice'}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Typography>Income: <span style={{ color: 'green' }}>₹{income}</span></Typography>
        <Typography>Expense: <span style={{ color: 'red' }}>₹{expense}</span></Typography>
        <Typography>Remaining: <span style={{ color: 'blue' }}>₹{budget - expense}</span></Typography>
      </Box>
    </Box>
  )
}