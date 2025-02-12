import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { Container } from '@mui/material'
import { Navbar } from './components/Navbar'

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter style={{ background: 'black' }}>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/task/new' element={<TaskForm />} />
            <Route path='/task/:id/edit' element={<TaskForm />} />

          </Routes>
        </Container>



      </BrowserRouter>
    </div>
  )
}

export default App