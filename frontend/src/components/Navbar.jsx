import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cpu, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ role }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 bg-black/90 border-b border-yellow-500/30 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Cpu className="text-yellow-400" size={28} />
          <span className="text-white font-bold text-xl tracking-widest">MACHINE<span className="text-yellow-400">SENSE</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {role === 'manager' && (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-yellow-400 transition">Dashboard</Link>
              <Link to="/upload" className="text-gray-300 hover:text-yellow-400 transition">Upload</Link>
              <Link to="/machines" className="text-gray-300 hover:text-yellow-400 transition">Machines</Link>
              <Link to="/train" className="text-gray-300 hover:text-yellow-400 transition">Train</Link>
            </>
          )}
          {role === 'employee' && (
            <Link to="/identify" className="text-gray-300 hover:text-yellow-400 transition">Identify</Link>
          )}
          <button onClick={logout} className="flex items-center gap-1 text-red-400 hover:text-red-300 transition">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-black px-4 pb-4 flex flex-col gap-3"
        >
          {role === 'manager' && (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-yellow-400">Dashboard</Link>
              <Link to="/upload" className="text-gray-300 hover:text-yellow-400">Upload</Link>
              <Link to="/machines" className="text-gray-300 hover:text-yellow-400">Machines</Link>
              <Link to="/train" className="text-gray-300 hover:text-yellow-400">Train</Link>
            </>
          )}
          {role === 'employee' && (
            <Link to="/identify" className="text-gray-300 hover:text-yellow-400">Identify</Link>
          )}
          <button onClick={logout} className="text-red-400 text-left">Logout</button>
        </motion.div>
      )}
    </motion.nav>
  )
}