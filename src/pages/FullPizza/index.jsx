import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './FullPizza.module.scss';

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState({});
  const { title, price, imageUrl, sizes, types, rating } = pizza;
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?id=${id}`,
        );
        setPizza(data[0]);
      } catch (e) {
        console.error(e.message);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) return 'Loading...';

  return (
    <div>
      <div><img src={imageUrl} alt="pi"/></div>
      <div>
        <h1>{title}</h1>
        <p>Цена: {price}</p>
        <p>Размеры: {sizes}</p>
        <p>Типы: {types}</p>
        <p>Рейтинг: {rating}</p>
      </div>
    </div>
  );
}

export default FullPizza;
