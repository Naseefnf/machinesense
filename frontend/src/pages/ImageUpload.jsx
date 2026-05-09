import { useState } from 'react'
import { motion } from 'framer-motion'
import { uploadImages } from '../services/api'
import Navbar from '../components/Navbar'
import { Upload, CheckCircle, AlertCircle, FolderOpen } from 'lucide-react'

export default function ImageUpload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      await uploadImages(formData)
      setSuccess(true)
      setFile(null)
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.name.endsWith('.zip')) setFile(dropped)
    else setError('Please upload a ZIP file only!')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar role="manager" />
      <div className="pt-24 px-4 max-w-3xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-black tracking-widest mb-2">UPLOAD <span className="text-yellow-400">IMAGES</span></h1>
          <div className="w-24 h-1 bg-yellow-400 mb-4" />
          <p className="text-gray-400">Upload a ZIP file containing folders of machine images. Each folder name becomes a machine label.</p>
        </motion.div>

        {/* Instructions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-yellow-500/30 p-6 mb-8">
          <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2"><FolderOpen size={18} /> ZIP STRUCTURE</h3>
          <div className="font-mono text-sm text-gray-300 space-y-1">
            <p>📦 machines.zip</p>
            <p className="ml-4">📁 lathe_machine/</p>
            <p className="ml-8">🖼 img1.jpg</p>
            <p className="ml-8">🖼 img2.jpg</p>
            <p className="ml-4">📁 grinding_machine/</p>
            <p className="ml-8">🖼 img1.jpg</p>
          </div>
        </motion.div>

        {/* Drop Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed p-16 text-center transition-all duration-300 cursor-pointer
            ${dragging ? 'border-yellow-400 bg-yellow-400/5' : 'border-zinc-700 hover:border-yellow-400/50'}`}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".zip"
            className="hidden"
            onChange={e => setFile(e.target.files[0])}
          />
          <Upload size={48} className={`mx-auto mb-4 ${dragging ? 'text-yellow-400' : 'text-zinc-600'}`} />
          {file ? (
            <div>
              <p className="text-yellow-400 font-bold text-lg">{file.name}</p>
              <p className="text-gray-500 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-white font-bold text-lg mb-2">DROP YOUR ZIP FILE HERE</p>
              <p className="text-gray-500 text-sm">or click to browse</p>
            </div>
          )}
        </motion.div>

        {/* Messages */}
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-4 bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 flex items-center gap-2">
            <CheckCircle size={18} /> Images uploaded successfully! Go to Machines to add descriptions.
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full mt-6 bg-yellow-400 text-black font-black py-4 text-lg hover:bg-yellow-300 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? 'UPLOADING...' : 'UPLOAD IMAGES'}
        </motion.button>
      </div>
    </div>
  )
}