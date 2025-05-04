import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.error('Error reading localStorage:', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const rawValue = JSON.stringify(value)
      localStorage.setItem(key, rawValue)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [key, value])

  return [value, setValue]
}