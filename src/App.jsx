import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CarList from './pages/CarList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={ <CarList />} />
      </Routes>
    </>
  )
}

export default App
