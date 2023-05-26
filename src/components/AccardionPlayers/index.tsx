import { FC, useState } from 'react';
import styles from './AccardionPlayers.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentPlaceholder } from './Placeholder';

const AccordionItem = ({ data, expanded, setExpanded }) => {
  const isOpen = data === expanded;
  console.log('data', data);
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? '#481fff' : '#4a96ff' }}
        className={styles.accordion__header}
        onClick={() => setExpanded(isOpen ? false : data)}>
        {data.player}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className='accordion-section'
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <ContentPlaceholder data={data} />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export const AccordionPlayers = (props) => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <div className='accordion'>
      {props.players.map((item) => (
        <AccordionItem data={item} expanded={expanded} setExpanded={setExpanded} />
      ))}
    </div>
  );
};

// <div className={styles.accordion__item} onClick={() => setIsActive(!isActive)}>
//   <div className={styles.accordion__title}>
//     <div className={styles.fio}>{props.surname}</div>
//     <div className={styles.fio}>{props.name}</div>
//     <div className={styles.fio}>{props.patronimyc}</div>
//     <div className={styles.activate}>{isActive ? '-' : '+'}</div>
//   </div>
//   {isActive && (
//     <div className={styles.accordion__content}>
//       <div className={styles.accordion__content_list}>
//         <div>Фамилия:</div>
//         <div className={styles.accordion__content_rez}>{props.surname}</div>
//       </div>
//       <div className={styles.accordion__content_list}>
//         <div>Имя:</div>
//         <div className={styles.accordion__content_rez}>{props.name}</div>
//       </div>
//       {props.patronimyc && (
//         <div className={styles.accordion__content_list}>
//           <div>Отчество:</div>
//           <div className={styles.accordion__content_rez}>{props.patronimyc}</div>
//         </div>
//       )}
//       <div className={styles.accordion__content_list}>
//         <div>Телефон:</div>
//         <div className={styles.accordion__content_rez}>{props.phone}</div>
//       </div>
//       <div className={styles.accordion__content_list}>
//         <div>Почта:</div>
//         <div className={styles.accordion__content_rez}>{props.email}</div>
//       </div>
//       <Link to={'/updateuser'} className={styles.button}>
//         Изменить
//       </Link>
//     </div>
//   )}
// </div>
// <>
//   <Accordion playersStats={players} onClickAddAction={onClickAddAction} />

export default AccordionPlayers;
