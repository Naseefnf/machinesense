import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { predictMachine } from '../services/api'
import Navbar from '../components/Navbar'
import { Camera, Upload, Shield, Info, Cpu, AlertCircle } from 'lucide-react'

export default function EmployeeView() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFile = (f) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError('')
  }

  const handlePredict = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await predictMachine(formData)
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Prediction failed. Make sure model is trained!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar role="employee" />
      <div className="pt-24 px-4 max-w-3xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-black tracking-widest mb-2">IDENTIFY <span className="text-yellow-400">MACHINE</span></h1>
          <div className="w-24 h-1 bg-yellow-400 mb-4" />
          <p className="text-gray-400">Take or upload a photo of any machine to identify it instantly.</p>
        </motion.div>

        {/* Upload Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div
            className="border-2 border-dashed border-zinc-700 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer p-8 text-center mb-6"
            onClick={() => document.getElementById('empFileInput').click()}
          >
            <input
              id="empFileInput"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={e => handleFile(e.target.files[0])}
            />
            {preview ? (
              <div>
                <img src={preview} alt="preview" className="max-h-64 mx-auto object-contain mb-4" />
                <p className="text-gray-400 text-sm">{file?.name}</p>
              </div>
            ) : (
              <div>
                <div className="flex justify-center gap-4 mb-4">
                  <Camera size={40} className="text-zinc-600" />
                  <Upload size={40} className="text-zinc-600" />
                </div>
                <p className="text-white font-bold text-lg mb-2">TAKE PHOTO OR UPLOAD IMAGE</p>
                <p className="text-gray-500 text-sm">Supports JPG, PNG</p>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePredict}
            disabled={!file || loading}
            className="w-full bg-yellow-400 text-black font-black py-4 text-lg hover:bg-yellow-300 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Cpu size={20} />
            {loading ? 'IDENTIFYING...' : 'IDENTIFY MACHINE'}
          </motion.button>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-4"
            >
              {/* Machine Name */}
              <div className="bg-zinc-900 border-l-4 border-yellow-400 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu size={20} className="text-yellow-400" />
                  <span className="text-gray-400 text-sm uppercase tracking-wider">Identified Machine</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-wider">{result.machine}</h2>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-yellow-400"
                    />
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">{result.confidence}%</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">Confidence Score</p>
              </div>

              {/* Description */}
              {result.description && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="bg-zinc-900 border border-zinc-800 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={18} className="text-blue-400" />
                    <h3 className="text-blue-400 font-bold uppercase tracking-wider text-sm">Description</h3>
                  </div>
                  <p className="text-gray-300">{result.description}</p>
                </motion.div>
              )}

              {/* Safety Warning */}
              {result.safety_warning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="bg-red-500/10 border border-red-500 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={18} className="text-red-400" />
                    <h3 className="text-red-400 font-bold uppercase tracking-wider text-sm">⚠ Safety Warning</h3>
                  </div>
                  <p className="text-red-300">{result.safety_warning}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}
      </div>
    </div>
  )
}