import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ManagerDashboard from './pages/ManagerDashboard'
import ImageUpload from './pages/ImageUpload'
import MachineManagement from './pages/MachineManagement'
import TrainPage from './pages/TrainPage'
import EmployeeView from './pages/EmployeeView'
import ProtectedRoute from './components/ProtectedRoute'
import AddEmployee from './pages/AddEmployee'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><ImageUpload /></ProtectedRoute>} />
        <Route path="/machines" element={<ProtectedRoute><MachineManagement /></ProtectedRoute>} />
        <Route path="/train" element={<ProtectedRoute><TrainPage /></ProtectedRoute>} />
        <Route path="/identify" element={<ProtectedRoute><EmployeeView /></ProtectedRoute>} />
        <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}