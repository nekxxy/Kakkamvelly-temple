import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import BlurText from './BlurText';

const testimonials = [
  {
    quote: 'PROCARE delivered a large-scale project ahead of schedule without compromising quality.',
    name: 'Rajiv Menon',
    role: 'Director, InfraBuild',
    initials: 'RM',
  },
  {
    quote: 'The level of precision and planning was unmatched. Truly next-generation construction.',
    name: 'Ankit Sharma',
    role: 'Project Head, UrbanAxis',
    initials: 'AS',
  },
  {
    quote: 'They transformed our vision into reality with incredible speed and craftsmanship.',
    name: 'Meera Kapoor',
    role: 'Developer, Skyline Group',
    initials: 'MK',
  },
];

function Card({ quote, name, role, initials, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="glass glass-hover rounded-2xl p-8 flex flex-col gap-6 cursor-default group relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="flex-shrink-0 opacity-40" style={{ color: 'var(--gold)' }}>
        <path
          d="M0 24V14.4C0 6.44 4.48 1.6 13.44 0l1.92 2.88C10.24 4.16 7.68 7.04 7.04 11.52H13.44V24H0ZM18.56 24V14.4C18.56 6.44 23.04 1.6 32 0l1.92 2.88C28.8 4.16 26.24 7.04 25.6 11.52H32V24H18.56Z"
          fill="currentColor"
        />
      </svg>
      <p className="font-body font-light text-white/65 text-base leading-relaxed flex-1">"{quote}"</p>
      <div className="flex items-center gap-4 pt-2 border-t border-white/[0.07]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-body font-medium flex-shrink-0"
          style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)', color: 'var(--gold)' }}
        >
          {initials}
        </div>
        <div>
          <div className="font-body font-medium text-white text-sm">{name}</div>
          <div className="font-body font-light text-white/35 text-xs mt-0.5">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 60%)' }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 md:mb-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
          >
            <span className="section-tag justify-center">Client Stories</span>
          </motion.div>
          <h2 className="font-heading italic text-white text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
            <BlurText text="Words from the" delay={0.1} wordDelay={0.08} />
            <br />
            <BlurText text="field." delay={0.35} wordDelay={0.12} className="text-white/55" />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={t.name} {...t} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
