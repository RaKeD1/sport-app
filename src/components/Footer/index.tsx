import { FC, useEffect, useLayoutEffect, useState } from "react";
import styles from "./footer.module.scss";

const Footer: FC = () => {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const handleScrollbar = () => {
      const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;
      setHasScrollbar(hasScrollbar);
    };
    window.addEventListener('resize', handleScrollbar);
    handleScrollbar();
    return () => {
      window.removeEventListener('resize', handleScrollbar);
    };
  }, []);

const containerStyle = {
  position: hasScrollbar ? "relative" : "fixed",
  width: "100%",
  bottom: 0,
} as React.CSSProperties;

  return (
    <div style={containerStyle}>
      <div className={styles.footer}>
        <nav className="container">
          <ul className={styles.footer__body}>
            <div className={styles.footer__block}>
              <h1 className={styles.footer__title}>
                <a
                  href="https://www.miet.ru/"
                  target="MIET"
                  className={styles.footer__title}
                >
                  МИЭТ
                </a>
              </h1>
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
