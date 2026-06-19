import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue } from 'framer-motion';

export const AmbientGrid = ({ dark = false }: { dark?: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex justify-between px-[5vw] xl:px-[10vw]">
      {[...Array(6)].map((_, i) => (
        <motion.div 
          key={i} 
          className={`relative w-[1px] h-full ${dark ? 'bg-gray-300/10' : 'bg-slate-900/10'}`}
          animate={{ x: [0, (i % 2 === 0 ? 15 : -15), 0] }}
          transition={{
            repeat: Infinity,
            duration: 20 + i * 2,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className={`absolute bottom-0 w-[2px] h-1/3 bg-gradient-to-t from-transparent ${dark ? 'via-gray-300/30' : 'via-slate-900/30'} to-transparent blur-[1px]`}
            animate={{ y: ['100vh', '-100vh'] }}
            transition={{
              repeat: Infinity,
              duration: 12 + (i % 3) * 3,
              ease: "linear",
              delay: i * 1.2,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale: 1.3 }} 
        className="absolute inset-0 w-full h-full object-cover origin-center"
      />
    </div>
  );
};

export const AnimatedCounter = ({ value, suffix = '', label, dark = false }: { value: number, suffix?: string, label: React.ReactNode, dark?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        animate(count, value, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (latest) => setDisplayValue(Math.round(latest))
        });
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated, count]);

  return (
    <div ref={ref} className="flex items-center gap-4 z-10 relative">
      <div className={`w-px h-8 ${dark ? 'bg-gray-700' : 'bg-gray-300'} hidden sm:block`}></div>
      <p className="text-xs uppercase tracking-wider text-gray-400 font-medium leading-relaxed">
        <span className={`text-base font-bold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{displayValue}{suffix}</span>
        <br/>
        {label}
      </p>
    </div>
  );
};

export const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);
