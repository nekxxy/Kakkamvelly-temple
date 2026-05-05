import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import BlurText from './BlurText';

function ProcessCard() {
  const steps = ['Site Analysis', 'Structural Planning', 'AI Optimization', 'Build Execution'];
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/[0.06]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/[0.08]"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.08) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-body font-medium"
                style={{
                  background: i === 3 ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.06)',
                  color: i === 3 ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${i === 3 ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {i + 1}
              </div>
              <span
                className="font-body font-light text-sm"
                style={{ color: i === 3 ? '#fff' : 'rgba(255,255,255,0.45)' }}
              >
                {step}
              </span>
              {i < 3 && <div className="ml-auto w-16 h-px bg-white/10" />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StartSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section id="process" className="relative py-28 md:py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.04) 0%, transparent 60%)' }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center" ref={ref}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <span className="section-tag">How It Works</span>
            </motion.div>

            <h2 className="font-heading italic text-white text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight mb-8">
              <BlurText text="You envision it." delay={0.1} wordDelay={0.09} />
              <br />
              <BlurText text="We construct it." delay={0.35} wordDelay={0.09} className="text-white/60" />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-body font-light text-white/50 text-base leading-relaxed mb-10 max-w-md"
            >
              Share your project. Our intelligent systems plan, optimize, and execute—from blueprint
              to build—faster and smarter than traditional methods.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#contact" className="btn-primary">
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProcessCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
