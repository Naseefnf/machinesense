import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMachines, updateMachine, deleteMachine } from '../services/api'
import Navbar from '../components/Navbar'
import { Edit2, Trash2, Save, X, Shield, FileText } from 'lucide-react'

export default function MachineManagement() {
  const [machines, setMachines] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ description: '', safety_warning: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMachines()
  }, [])

  const fetchMachines = async () => {
    const res = await getMachines()
    setMachines(res.data)
  }

  const startEdit = (m) => {
    setEditing(m.id)
    setForm({ description: m.description || '', safety_warning: m.safety_warning || '' })
  }

  const saveEdit = async (id) => {
    setLoading(true)
    await updateMachine(id, form)
    setEditing(null)
    await fetchMachines()
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this machine?')) return
    await deleteMachine(id)
    await fetchMachines()
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar role="manager" />
      <div className="pt-24 px-4 max-w-5xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-black tracking-widest mb-2">MACHINE <span className="text-yellow-400">MANAGEMENT</span></h1>
          <div className="w-24 h-1 bg-yellow-400" />
        </motion.div>

        <AnimatePresence>
          {machines.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500/30 transition-all duration-300 mb-4 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400" />
                  <h3 className="text-white font-black text-lg uppercase tracking-wider">{m.label}</h3>
                </div>
                <div className="flex gap-2">
                  {editing === m.id ? (
                    <>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => saveEdit(m.id)}
                        className="bg-green-500 text-white p-2 hover:bg-green-400 transition">
                        <Save size={16} />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => setEditing(null)}
                        className="bg-zinc-700 text-white p-2 hover:bg-zinc-600 transition">
                        <X size={16} />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => startEdit(m)}
                        className="bg-yellow-400 text-black p-2 hover:bg-yellow-300 transition">
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(m.id)}
                        className="bg-red-500/20 text-red-400 p-2 hover:bg-red-500/40 transition">
                        <Trash2 size={16} />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              {editing === m.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 flex items-center gap-1"><FileText size={12} /> DESCRIPTION</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:border-yellow-400 focus:outline-none transition resize-none"
                      rows={3}
                      placeholder="Describe this machine..."
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 flex items-center gap-1"><Shield size={12} /> SAFETY WARNING</label>
                    <textarea
                      value={form.safety_warning}
                      onChange={e => setForm({ ...form, safety_warning: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:border-yellow-400 focus:outline-none transition resize-none"
                      rows={2}
                      placeholder="Add safety warnings..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FileText size={14} className="text-gray-500 mt-0.5 shrink-0" />
                    <p className="text-gray-400 text-sm">{m.description || 'No description — click edit to add'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield size={14} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-red-400 text-sm">{m.safety_warning || 'No safety warning — click edit to add'}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {machines.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No machines found. Upload images first!
          </div>
        )}
      </div>
    </div>
  )
}