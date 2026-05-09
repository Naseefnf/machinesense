import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getMachines } from '../services/api'
import Navbar from '../components/Navbar'
import { Upload, Cpu, Zap, Database, Users } from 'lucide-react'

export default function ManagerDashboard() {
  const [machines, setMachines] = useState([])

  useEffect(() => {
    getMachines().then(res => setMachines(res.data)).catch(() => {})
  }, [])

  const stats = [
    { label: 'Total Machines', value: machines.length, icon: <Database size={24} />, color: 'border-yellow-400' },
    { label: 'Upload Images', value: 'Upload', icon: <Upload size={24} />, color: 'border-blue-400', link: '/upload' },
    { label: 'Train Model', value: 'Train', icon: <Zap size={24} />, color: 'border-green-400', link: '/train' },
    { label: 'Identify Machine', value: 'Identify', icon: <Cpu size={24} />, color: 'border-purple-400', link: '/identify' },
    { label: 'Add Employee', value: 'Add', icon: <Users size={24} />, color: 'border-orange-400', link: '/add-employee' }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar role="manager" />
      <div className="pt-24 px-4 max-w-7xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-black tracking-widest mb-2">MANAGER <span className="text-yellow-400">DASHBOARD</span></h1>
          <div className="w-24 h-1 bg-yellow-400" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-zinc-900 border-l-4 ${s.color} p-6 cursor-pointer`}
            >
              {s.link ? (
                <Link to={s.link} className="block">
                  <div className="text-yellow-400 mb-3">{s.icon}</div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.label}</div>
                </Link>
              ) : (
                <>
                  <div className="text-yellow-400 mb-3">{s.icon}</div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.label}</div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Machine List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-black tracking-widest mb-6">YOUR <span className="text-yellow-400">MACHINES</span></h2>
          {machines.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 p-12 text-center">
              <Cpu size={48} className="text-zinc-600 mx-auto mb-4" />
              <p className="text-gray-500">No machines yet. Upload images to get started!</p>
              <Link to="/upload" className="inline-block mt-4 bg-yellow-400 text-black font-bold px-6 py-3 hover:bg-yellow-300 transition">
                UPLOAD IMAGES
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {machines.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ borderColor: '#facc15' }}
                  className="bg-zinc-900 border border-zinc-800 p-6 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <h3 className="text-white font-bold uppercase tracking-wider">{m.label}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{m.description || 'No description yet'}</p>
                  <p className="text-red-400 text-xs">{m.safety_warning || 'No safety warning yet'}</p>
                  <Link to="/machines" className="inline-block mt-4 text-yellow-400 text-sm hover:underline">Edit →</Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}