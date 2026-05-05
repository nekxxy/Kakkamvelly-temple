import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function BlurText({
  text,
  className = '',
  delay = 0,
  wordDelay = 0.07,
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(14px)', opacity: 0, y: 18 }}
          animate={
            inView
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(14px)', opacity: 0, y: 18 }
          }
          transition={{
            duration: 0.9,
            delay: delay + i * wordDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
