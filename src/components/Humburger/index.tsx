import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';
import { useDimensions } from './use-dimensions';
import styles from './humburger.module.scss';
import useOnClickOutside from '../../hooks/onClickOutside';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100px 100px)`,
    visability: 'visible',
    backgroundColor: '#fff',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: -1,
    },
  }),
  closed: {
    clipPath: 'circle(25px at 435px 55px)',
    visability: 'hidden',
    backgroundColor: '#fff',
    transition: {
      delay: 0.05,
      type: 'spring',
      stiffness: 300,
      damping: 40,
    },
  },
};
// const sidebar2 = {
//   open: (height = 1000) => ({
//     clipPath: `circle(${height * 2 + 200}px at 100px 100px)`,
//     visability: 'visible',
//     transition: {
//       type: 'spring',
//       stiffness: 20,
//       restDelta: 2,
//     },
//   }),
//   closed: {
//     clipPath: 'circle(40px at 435px 55px)',
//     visability: 'hidden',
//     transition: {
//       delay: 0.3,
//       type: 'spring',
//       stiffness: 100,
//       damping: 40,
//     },
//   },
// };

const Hamburger = ({ setIsOpen, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

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
          custom={height}
          ref={containerRef}
          variants={sidebar}
          animate={isOpen ? 'open' : 'closed'}
          // style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        >
          <motion.div className={styles.background} variants={sidebar} />
          <Navigation setIsOpen={setIsOpen} />
        </motion.nav>
      </div>
    </>
  );
};
export default Hamburger;
