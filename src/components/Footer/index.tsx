import { FC, useEffect, useRef, useState } from 'react';
import styles from './footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <nav className='container'>
        <ul className={styles.footer__body}>
          <div className={styles.footer__block}>
            <h1 className={styles.footer__title}>МИЭТ</h1>
            <a
              className={styles.footer__text}
              href='https://yandex.ru/maps/org/moskovskiy_institut_elektronnoy_tekhniki/1042223652/?ll=37.208453%2C55.983384&z=17.08'
              target='MIET'>
              площадь Шокина, 1
            </a>
          </div>
          <div className={styles.footer__teacher}>
            <h1 className={styles.footer__title}>Преподаватель</h1>
            <p className={styles.footer__text}>Борисова Наталья Юрьевна</p>
            <p className={styles.footer__text}>почта препода</p>
          </div>
          <div className={styles.footer__dev}>
            <h1 className={styles.footer__title}>Разработано командой:</h1>
            <p className={styles.footer__text}>
              <a href='https://github.com/KKuhta' target='GitHub Kirill'>
                Кирилл
              </a>
              ,{' '}
              <a href='https://github.com/RaKeD1' target='GitHub Danila'>
                Данила
              </a>
              ,{' '}
              <a href='https://github.com/Bogdan-67' target='GitHub Bogdan'>
                Богдан
              </a>
            </p>
          </div>
        </ul>
        {/* адрес миэта, ФИО препода, номер препода, почта препода, разработчики ФИО */}
      </nav>
    </div>
  );
};

export default Footer;
