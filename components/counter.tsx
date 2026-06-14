'use client'

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setCount((c) => c + 1), 1000)
    return () => clearTimeout(timer)
  }, [count])

  return (
    <div>The count is {count}</div>
  )
}