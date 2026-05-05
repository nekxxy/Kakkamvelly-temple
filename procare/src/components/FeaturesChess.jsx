import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

function VisualA() {
  return (
    <div className="relative w-full aspect-square md:aspect-[5/4] rounded-2xl overflow-hidden glass">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(201,169,110,0.04) 0%, rgba(80,100,140,0.04) 100%)',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-52 h-52">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-white/10" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-white/[0.07]" />
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }}
          >
            <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10" stroke="rgba(201,169,110,0.7)" strokeWidth="1.2">
              <rect x="10" y="30" width="12" height="20" />
              <rect x="24" y="20" width="12" height="30" />
              <rect x="38" y="10" width="12" height="40" />
              <line x1="8" y1="50" x2="52" y2="50" />
            </svg>
          </motion.div>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: 'var(--gold)',
                top: `${50 - 48 * Math.cos((deg * Math.PI) / 180)}%`,
                left: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                transform: 'translate(-50%,-50%)',
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-end gap-2 h-16">
          {[65, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6, ease: 'easeOut' }}
              className="flex-1 rounded-t-sm origin-bottom"
              style={{ height: `${h}%`, background: i === 7 ? 'rgba(201,169,110,0.5)' : 'rgba(255,255,255,0.08)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualB() {
  return (
    <div className="relative w-full aspect-square md:aspect-[5/4] rounded-2xl overflow-hidden glass">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(225deg, rgba(80,100,160,0.05) 0%, rgba(20,20,30,0.5) 100%)' }}
      />
      <div className="absolute inset-6 grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl flex items-center justify-center"
            style={{
              background: i === 4 ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${i === 4 ? 'rgba(201,169,110,0.25)' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {i === 4 && (
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="var(--gold)" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-body font-medium"
        style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', color: 'var(--gold)' }}
      >
        AI Active
      </motion.div>
    </div>
  );
}

function Row({ reverse, title, body, cta, Visual }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}
    >
      <div className={reverse ? 'lg:col-start-2' : ''}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-heading italic text-white text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6">
            {title}
          </h3>
          <p className="font-body font-light text-white/50 text-base leading-relaxed mb-8 max-w-md">
            {body}
          </p>
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-sm font-body font-medium tracking-wide transition-all duration-300 group"
            style={{ color: 'var(--gold)' }}
          >
            {cta}
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div
        className={reverse ? 'lg:col-start-1 lg:row-start-1' : ''}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <Visual />
      </motion.div>
    </div>
  );
}

export default function FeaturesChess() {
  return (
    <section id="services" className="relative py-24 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(201,169,110,0.03) 0%, transparent 55%)' }}
      />
      <div className="max-w-7xl mx-auto px-6 space-y-28 md:space-y-40">
        <Row
          title="Engineered for strength. Designed for impact."
          body="Every structure is optimized for durability, safety, and performance using data-driven design and advanced modeling."
          cta="Explore Engineering"
          Visual={VisualA}
        />
        <Row
          reverse
          title="Smart construction. Faster delivery."
          body="Our AI continuously optimizes timelines, materials, and execution—reducing delays and maximizing efficiency on every project."
          cta="See Process"
          Visual={VisualB}
        />
      </div>
    </section>
  );
}
