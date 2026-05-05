import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Zap, Palette, BarChart3, Shield } from 'lucide-react';
import BlurText from './BlurText';

const features = [
  { icon: Zap,      title: 'Faster Delivery',  body: 'AI-driven planning reduces delays and accelerates project timelines.' },
  { icon: Palette,  title: 'Precision Design',  body: 'Architectural excellence meets engineering accuracy.' },
  { icon: BarChart3,title: 'Cost Optimized',    body: 'Smart material and resource optimization lowers costs without compromise.' },
  { icon: Shield,   title: 'Built to Last',     body: 'Safety, compliance, and durability built into every structure.' },
];

function Card({ icon: Icon, title, body, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="glass glass-hover rounded-2xl p-8 flex flex-col gap-5 cursor-default group"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
      >
        <Icon size={18} style={{ color: 'var(--gold)' }} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-heading italic text-white text-xl mb-2.5">{title}</h3>
        <p className="font-body font-light text-white/45 text-sm leading-relaxed">{body}</p>
      </div>
      <div className="mt-auto pt-2">
        <div
          className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
          style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.6), transparent)' }}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-24 md:py-36">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(100,120,200,0.03) 0%, transparent 55%)' }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
          >
            <span className="section-tag justify-center">Why PROCARE</span>
          </motion.div>
          <h2 className="font-heading italic text-white text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
            <BlurText text="Built differently." delay={0.1} wordDelay={0.1} />
            <br />
            <BlurText text="Built better." delay={0.3} wordDelay={0.12} className="text-white/55" />
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Card key={f.title} {...f} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
