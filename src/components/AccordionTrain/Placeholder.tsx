import * as React from 'react';
import { motion } from 'framer-motion';
import { columnNames } from '../../pages/TrainingEdit';

const generateParagraphLength = () => Math.round((Math.random() % 10) * 2);
const generateWordLength = () => Math.random() % 10;

// Randomly generate some paragraphs of word lengths
const paragraphs = [...Array(3)].map(() => {
  return [...Array(generateParagraphLength())].map(generateWordLength);
});

export const Word = ({ width }) => <div className='word' style={{ width }} />;

const Paragraph = ({ words }) => (
  <div className='paragraph'>
    {words.map((width) => (
      <Word width={width} />
    ))}
  </div>
);

export const ContentPlaceholder = ({ data, onClickAddAction }) => (
  <motion.div
    variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
    transition={{ duration: 0.5 }}
    className='content-placeholder'>
    {Object.entries(data)
      .filter((arr) => arr[0] !== 'fio' && arr[0] !== 'id_train')
      .map((arr, index) => {
        const num = arr[1].toString().replace('0.', '');

        return (
          <div key={index} className='accordion__content_list'>
            <div className='accordion__content_list_text'>{columnNames[arr[0]]}</div>
            <div className='accordion__content_rez'>
              {num + (num.length === 1 && num !== '0' ? '0%' : '%')}
            </div>
          </div>
        );
      })}
    <button className='accordion__button' onClick={() => onClickAddAction(data.id_train)}>
      Добавить
    </button>
  </motion.div>
);
