import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 99,  suffix: '%', label: 'Safety Compliance'  },
  { value: 2.5, suffix: 'x', label: 'Faster Delivery'    },
  { value: 10,  suffix: '+', label: 'Years Experience'    },
];

function useCountUp(target, inView, duration = 1700) {
  const [count, setCount] = useState(0);
  const isFloat = !Number.isInteger(target);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = eased * target;
      setCount(isFloat ? Math.round(cur * 10) / 10 : Math.floor(cur));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, isFloat]);
  return count;
}

function StatItem({ value, suffix, label, index, inView }) {
  const count = useCountUp(value, inView, 1600 + index * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-4 py-10 relative"
    >
      <div className="font-heading italic text-white text-5xl sm:text-6xl md:text-7xl leading-none mb-3 tracking-tight">
        {count}{suffix}
      </div>
      <div className="font-body font-light text-white/40 text-sm tracking-wide">{label}</div>
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px"
        initial={{ width: 0 }}
        animate={inView ? { width: '40%' } : { width: 0 }}
        transition={{ duration: 0.8, delay: index * 0.12 + 0.4 }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }}
      />
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <section className="relative py-0 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(201,169,110,0.025) 50%, transparent 100%)' }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="glass rounded-2xl md:rounded-3xl border border-white/[0.07] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07] overflow-hidden"
        >
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
