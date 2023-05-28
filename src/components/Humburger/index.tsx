import * as React from 'react';
import { useRef } from 'react';
import { motion, sync, useCycle } from 'framer-motion';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';
import { useDimensions } from './use-dimensions';
import styles from './humburger.module.scss';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 0px 0px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const Hamburger = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <MenuToggle toggle={toggleOpen} />
      <motion.nav
        className={styles.nav}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={containerRef}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
        <motion.div className={styles.background} variants={sidebar} />
        <Navigation />
      </motion.nav>
    </>
  );
};
export default Hamburger;
