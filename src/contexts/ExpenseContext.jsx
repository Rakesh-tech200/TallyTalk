import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ExpenseContext = createContext()

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  const [listening, setListening] = useState(false)
  const [budget, setBudget] = useLocalStorage('budget', 0)

  const income = expenses
    .filter(exp => exp.amount > 0)
    .reduce((sum, exp) => sum + exp.amount, 0)
  
  const expense = expenses
    .filter(exp => exp.amount < 0)
    .reduce((sum, exp) => sum + exp.amount, 0) * -1

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, {
      id: Date.now(),
      ...expense,
      date: new Date().toISOString(),
    }])
  }

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id))
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in your browser')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.start()
    setListening(true)

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase()
      const amountMatch = transcript.match(/\d+/)
      const categoryMatch = transcript.match(/salary|food|transport|shopping|other/i)
      const isIncome = transcript.includes('salary') || transcript.includes('income')

      const amount = amountMatch ? parseFloat(amountMatch[0]) : 0
      const finalAmount = isIncome ? amount : -amount

      addExpense({
        amount: finalAmount,
        category: categoryMatch ? categoryMatch[0].toLowerCase() : 'other',
        description: transcript,
      })
      setListening(false)
    }

    recognition.onerror = () => {
      setListening(false)
    }
  }

  return (
    <ExpenseContext.Provider value={{
      expenses,
      income,
      expense,
      budget,
      setBudget,
      addExpense: addExpense,
      deleteExpense,
      listening,
      startListening,
    }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export const useExpense = () => useContext(ExpenseContext)