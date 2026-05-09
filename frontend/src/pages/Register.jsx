import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { registerCompany } from '../services/api'
import { Cpu, Loader } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({ company_name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await registerCompany(form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-zinc-900/95 border border-yellow-500/30 p-10"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Cpu className="text-yellow-400" size={28} />
          <span className="text-white font-black text-2xl tracking-widest">MACHINE<span className="text-yellow-400">SENSE</span></span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 text-center">REGISTER COMPANY</h2>
        <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-8" />

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 mb-6 text-sm">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">COMPANY NAME</label>
            <input
              type="text"
              value={form.company_name}
              onChange={e => setForm({ ...form, company_name: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:border-yellow-400 focus:outline-none transition"
              placeholder="ABC Factory"
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
              placeholder="manager@company.com"
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
            {loading ? <><Loader size={18} className="animate-spin" /> REGISTERING...</> : 'REGISTER'}
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  )
}