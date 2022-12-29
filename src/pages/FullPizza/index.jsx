import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './FullPizza.module.scss';

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState({});
  const typeNames = ['тонкое', 'традиционное'];

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?id=${id}`,
        );
        setPizza(data[0]);
      } catch (e) {
        // console.log(e.message);
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza.sizes) return 'Loading...';

  return (
    <div className={styles.root}>
      <img src={pizza.imageUrl} alt="pi" />
      <div className={styles.right}>
        <div>
          <h1>{pizza.title}</h1>
          <h3>Размеры: {pizza.sizes.map(size => <span key={size}>{size} см </span>)}</h3>
          <h3>Типы: {pizza.types.map(type => <span key={type}>{typeNames[type]} тесто </span>)}</h3>
          <h2>Рейтинг: {pizza.rating}</h2>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>от {pizza.price} ₽</div>
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FullPizza;