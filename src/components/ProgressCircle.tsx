import { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const ProgressCircle = ({ progress }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = ((100 - progress) / 100) * circumference;

  const circleVariants = {
    initial: { strokeDashoffset: circumference },
    animate: { strokeDashoffset: offset },
  };

  const circleStyle = {
    stroke: '#78c6ff',
    strokeWidth: 10,
    fill: 'transparent',
    strokeLinecap: useMotionValue('round'),
    strokeDasharray: circumference,
    transformOrigin: '50% 50%',
    transform: 'rotate(-90deg)',
  };

  const controls = useAnimation();
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    controls.start({ strokeDashoffset: offset });
  }, [controls, offset]);

  useEffect(() => {
    controls.set({ strokeDashoffset: circumference });
    controls.start({ strokeDashoffset: offset });

    let requestId;
    let startTimestamp = null;
    const duration = 1500;

    const animateProgress = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progressTimestamp = timestamp - startTimestamp;
      const progressFraction = Math.min(progressTimestamp / duration, 1);
      const currentProgress = progressFraction * progress;

      setAnimatedProgress(currentProgress);

      if (progressTimestamp < duration) {
        requestId = requestAnimationFrame(animateProgress);
      }
    };

    requestId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [controls, offset, progress]);

  return (
    <svg width='100' height='100'>
      <motion.circle
        cx='50'
        cy='50'
        r='45'
        style={circleStyle}
        variants={circleVariants}
        transition={{ duration: 1.5 }}
        initial='initial'
        animate='animate'
      />
      <text x='50' y='55' textAnchor='middle' alignmentBaseline='middle'>
        {Math.round(animatedProgress)}%
      </text>
    </svg>
  );
};

export default ProgressCircle;
