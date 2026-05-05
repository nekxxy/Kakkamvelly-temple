import { motion } from 'motion/react';
import BlurText from './BlurText';

const partners = ['Larsen & Toubro', 'Tata Projects', 'Shapoorji Pallonji', 'DLF', 'Sobha'];

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#020202]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(100,120,160,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#020202]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
      <motion.div
        animate={{ y: ['0%', '110vh'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        className="absolute left-1/2 top-0 w-px h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(201,169,110,0.4) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-body font-medium tracking-[0.15em] uppercase border bg-white/[0.04] backdrop-blur-md"
            style={{ color: 'var(--gold)', borderColor: 'rgba(201,169,110,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
            AI-powered construction solutions
          </span>
        </motion.div>

        <h1 className="font-heading italic text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-8 max-w-4xl">
          <BlurText text="We Build What" delay={0.5} wordDelay={0.08} />
          <br />
          <BlurText text="Others Can't" delay={0.8} wordDelay={0.1} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-body font-light text-white/55 text-base sm:text-lg max-w-xl leading-relaxed mb-12"
        >
          From concept to completion, PROCARE delivers precision-built infrastructure using AI-driven
          planning, expert engineering, and uncompromising quality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-24"
        >
          <a href="#contact" className="btn-primary">
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#projects" className="btn-secondary">View Projects</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="w-full"
        >
          <p className="text-white/25 text-xs font-body font-light tracking-[0.2em] uppercase mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 + i * 0.1, duration: 0.6 }}
                className="font-body font-light text-sm text-white/30 tracking-wide hover:text-white/60 transition-colors duration-300 cursor-default"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
