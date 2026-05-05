import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import BlurText from './BlurText';

export default function CtaFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <footer id="contact" className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="section-tag justify-center">Get Started</span>
        </motion.div>

        <h2 className="font-heading italic text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.04] tracking-tight mb-8">
          <BlurText text="Let's build your" delay={0.1} wordDelay={0.08} />
          <br />
          <BlurText text="next landmark." delay={0.35} wordDelay={0.1} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-body font-light text-white/45 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-12"
        >
          Start your project with PROCARE and experience construction redefined through
          intelligence, precision, and speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="mailto:hello@procare.build" className="btn-primary">
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="tel:+910000000000" className="btn-secondary">Contact Us</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 pt-8 border-t border-white/[0.07]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="font-body font-semibold text-white text-lg tracking-[0.22em]">PROCARE</span>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Careers'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-body font-light text-white/30 text-xs tracking-wide hover:text-white/60 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
            <p className="font-body font-light text-white/25 text-xs tracking-wide">
              © 2026 PROCARE. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
