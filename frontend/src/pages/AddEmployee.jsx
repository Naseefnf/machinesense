import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Loader, UserPlus } from 'lucide-react'
import axios from 'axios'

export default function AddEmployee() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://127.0.0.1:8000/users/create-employee', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess(true)
      setForm({ name: '', email: '', password: '' })
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar role="manager" />
      <div className="pt-24 px-4 max-w-md mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-black tracking-widest mb-2">ADD <span className="text-yellow-400">EMPLOYEE</span></h1>
          <div className="w-24 h-1 bg-yellow-400" />
        </motion.div>

        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 mb-6">
            ✅ Employee created successfully!
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 mb-6">
            {error}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">EMPLOYEE NAME</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:border-yellow-400 focus:outline-none transition"
                placeholder="John Smith"
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">EMAIL</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:border-yellow-400 focus:outline-none transition"
                placeholder="employee@company.com"
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">PASSWORD</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:border-yellow-400 focus:outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-4 hover:bg-yellow-300 transition flex items-center justify-center gap-2"
            >
              {loading ? <><Loader size={18} className="animate-spin" /> CREATING...</> : <><UserPlus size={18} /> CREATE EMPLOYEE</>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}