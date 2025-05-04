import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ExpenseProvider } from './contexts/ExpenseContext'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </React.StrictMode>
)