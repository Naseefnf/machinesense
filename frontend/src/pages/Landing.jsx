import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cpu, Shield, Zap, Users } from 'lucide-react'

const features = [
  { icon: <Cpu size={32} />, title: 'AI Powered', desc: 'ResNet50 Transfer Learning identifies machines instantly' },
  { icon: <Zap size={32} />, title: 'One Click Training', desc: 'Upload images and train your model with a single click' },
  { icon: <Shield size={32} />, title: 'Safety First', desc: 'Safety warnings displayed for every identified machine' },
  { icon: <Users size={32} />, title: 'Multi Company', desc: 'Each company gets their own isolated AI model' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Cpu className="text-yellow-400" size={48} />
              <h1 className="text-5xl md:text-7xl font-black tracking-widest">
                MACHINE<span className="text-yellow-400">SENSE</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
              AI-Powered Machine Identification for Factory Floors
            </p>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Empower your workforce. Identify any machine instantly. Stay safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="bg-yellow-400 text-black font-bold px-8 py-4 text-lg hover:bg-yellow-300 transition block">
                GET STARTED
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="border-2 border-yellow-400 text-yellow-400 font-bold px-8 py-4 text-lg hover:bg-yellow-400 hover:text-black transition block">
                MANAGER LOGIN
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login?role=employee" className="border-2 border-white text-white font-bold px-8 py-4 text-lg hover:bg-white hover:text-black transition block">
                EMPLOYEE LOGIN
              </Link>
            </motion.div>
          </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-400 text-sm flex flex-col items-center gap-1"
        >
          <span>SCROLL</span>
          <div className="w-px h-8 bg-yellow-400" />
        </motion.div>
      </div>

      {/* Features */}
      <div className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-widest mb-4">
              WHY <span className="text-yellow-400">MACHINESENSE</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, borderColor: '#facc15' }}
                className="border border-zinc-800 p-8 text-center transition-all duration-300"
              >
                <div className="text-yellow-400 mb-4 flex justify-center">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 px-4 bg-yellow-400">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-black text-black mb-4">READY TO TRANSFORM YOUR FACTORY?</h2>
          <p className="text-black/70 mb-8">Join companies already using MachineSense to keep their workers safe and informed.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/register" className="bg-black text-yellow-400 font-bold px-10 py-4 text-lg hover:bg-zinc-900 transition inline-block">
              START FREE TODAY
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-black py-8 text-center text-gray-500 text-sm border-t border-zinc-800">
        © 2026 MachineSense. Built for factory safety.
      </div>
    </div>
  )
}