import { FC, useEffect, useRef, useState } from "react";
import styles from "./footer.module.scss";

const Footer: FC = () => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      setHasScroll(scrollHeight > clientHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerStyle = {
    position: hasScroll ? 'relative' : 'fixed',
    width: '100%',
    bottom: 0
    // Другие стили по вашему выбору
  } as React.CSSProperties;

  return (
    <div style={containerStyle}>
      <div className={styles.footer}>
        <div className={styles.footerCheck}></div>
        <nav className="container">
          <ul className={styles.footer__body}>
            <div className={styles.footer__block}>
              <h1 className={styles.footer__title}>МИЭТ</h1>
              <a
                className={styles.footer__text}
                href="https://yandex.ru/maps/org/moskovskiy_institut_elektronnoy_tekhniki/1042223652/?ll=37.208453%2C55.983384&z=17.08"
                target="MIET"
              >
                площадь Шокина, 1
              </a>
            </div>
            <div className={styles.footer__teacher}>
              <h1 className={styles.footer__title}>Преподаватель</h1>
              <p className={styles.footer__text}>Борисова Наталья Юрьевна</p>
              <a
                href="mailto:n.y.borisova@mail.ru"
                className={styles.footer__text}
              >
                n.y.borisova@mail.ru
              </a>
            </div>
            <div className={styles.footer__dev}>
              <h1 className={styles.footer__title}>Разработано командой:</h1>
              <p className={styles.footer__text}>
                <a href="https://github.com/KKuhta" target="GitHub Kirill">
                  Кирилл
                </a>
                ,{" "}
                <a href="https://github.com/RaKeD1" target="GitHub Danila">
                  Данила
                </a>
                ,{" "}
                <a href="https://github.com/Bogdan-67" target="GitHub Bogdan">
                  Богдан
                </a>
              </p>
            </div>
          </ul>
          {/* адрес миэта, ФИО препода, номер препода, почта препода, разработчики ФИО */}
        </nav>
      </div>
    </div>
  );
};

export default Footer;
