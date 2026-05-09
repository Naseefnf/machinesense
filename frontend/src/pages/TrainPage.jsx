import { useState } from 'react'
import { motion } from 'framer-motion'
import { trainModel } from '../services/api'
import Navbar from '../components/Navbar'
import { Zap, CheckCircle, AlertCircle, Brain } from 'lucide-react'

export default function TrainPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleTrain = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await trainModel()
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Training failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar role="manager" />
      <div className="pt-24 px-4 max-w-3xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-black tracking-widest mb-2">TRAIN <span className="text-yellow-400">MODEL</span></h1>
          <div className="w-24 h-1 bg-yellow-400 mb-4" />
          <p className="text-gray-400">Train your AI model on uploaded machine images. This may take a few minutes.</p>
        </motion.div>

        {/* Train Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 p-12 text-center mb-8">
          <motion.div
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={loading ? { repeat: Infinity, duration: 2, ease: 'linear' } : {}}
            className="inline-block mb-6"
          >
            <Brain size={72} className={loading ? 'text-yellow-400' : 'text-zinc-600'} />
          </motion.div>
          <h2 className="text-2xl font-black mb-2">
            {loading ? 'TRAINING IN PROGRESS...' : 'READY TO TRAIN'}
          </h2>
          <p className="text-gray-500 mb-8">
            {loading
              ? 'ResNet50 is learning your machines. Please wait...'
              : 'Click the button below to start AI training on your uploaded images.'}
          </p>

          {loading && (
            <div className="mb-8">
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-400"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 30, ease: 'linear' }}
                />
              </div>
              <p className="text-yellow-400 text-sm mt-2">Training... this may take 1-3 minutes</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            onClick={handleTrain}
            disabled={loading}
            className="bg-yellow-400 text-black font-black px-16 py-5 text-xl hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
          >
            <Zap size={24} />
            {loading ? 'TRAINING...' : 'START TRAINING'}
          </motion.button>
        </motion.div>

        {/* Result */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500 p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={24} className="text-green-400" />
              <h3 className="text-green-400 font-black text-xl">TRAINING COMPLETE!</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-4 text-center">
              <div className="text-4xl font-black text-yellow-400">{result.accuracy}%</div>
              <div className="text-gray-400 text-sm mt-1">TRAINING ACCURACY</div>
            </div>
            <div className="bg-zinc-900 p-4 text-center">
              <div className="text-4xl font-black text-yellow-400">{result.val_accuracy}%</div>
              <div className="text-gray-400 text-sm mt-1">VALIDATION ACCURACY</div>
            </div>
            <div className="bg-zinc-900 p-4 text-center col-span-2">
              <div className="text-4xl font-black text-yellow-400">{result.num_classes}</div>
              <div className="text-gray-400 text-sm mt-1">MACHINE CLASSES</div>
            </div>
          </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">TRAINED CLASSES:</p>
              <div className="flex flex-wrap gap-2">
                {result.classes.map((c, i) => (
                  <span key={i} className="bg-zinc-800 text-yellow-400 px-3 py-1 text-xs font-bold uppercase">{c}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}
      </div>
    </div>
  )
}