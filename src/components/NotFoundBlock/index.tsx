import styles from './NotFoundBlock.module.scss';
import {Link} from "react-router-dom";
import React from "react";

const NotFoundBlock: React.FC = () => {
  return (
    <div className="container cart--empty">
      <div className="cart cart--empty">
        <h2 >
          Ничего не найдено <span>😕</span>
        </h2>
        <p className={styles.paragraph}>
          Данная страница отсутствует в нашем магазине.
          <br />
          Для того, чтобы заказать пиццу, перейдите на главную страницу.
        </p>
        <Link to="/" className="button button--black">
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundBlock;
