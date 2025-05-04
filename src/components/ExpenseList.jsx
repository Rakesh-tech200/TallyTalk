import { List, ListItem, ListItemText, IconButton, Typography, Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useExpense } from '../contexts/ExpenseContext'
import { styles } from '../styles'

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpense()

  return (
    <div>
      <Typography variant="h5" gutterBottom>Transactions</Typography>
      <List sx={styles.list}>
        {expenses.map(exp => (
          <div key={exp.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteExpense(exp.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={exp.description}
                secondary={`₹${Math.abs(exp.amount)} - ${exp.category}`}
                sx={{
                color: exp.amount > 0 ? 'green' : 'red',
                }}
              />
            </ListItem>
      <Divider />
          </div>
        ))}
      </List>
    </div>
  )
}