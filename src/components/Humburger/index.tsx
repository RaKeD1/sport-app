import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';
import { useDimensions } from './use-dimensions';
import styles from './humburger.module.scss';
import useOnClickOutside from '../../hooks/onClickOutside';

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

const Hamburger = ({ setIsOpen, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const { height } = useDimensions(ref);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={isOpen ? styles.backDrop : ''}></div>
      <div ref={ref}>
        <MenuToggle toggle={toggleOpen} />
        <motion.nav
          className={styles.nav}
          initial={false}
          variants={sidebar}
          animate={isOpen ? 'open' : 'closed'}
          style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
          <motion.div className={styles.background} variants={sidebar} />
          <Navigation setIsOpen={setIsOpen} />
        </motion.nav>
      </div>
    </>
  );
};
export default Hamburger;
