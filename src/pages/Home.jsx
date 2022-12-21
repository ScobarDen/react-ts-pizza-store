import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndexCategory, setActiveIndexCategory] = useState(0);
  const [selectedSortType, setSelectedSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  const category = activeIndexCategory ? `category=${activeIndexCategory}` : '';
  const orderSort = 'asc';
  const sortBy = `&sortBy=${selectedSortType.sort}&order=${orderSort}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?${category}${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [activeIndexCategory, selectedSortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={activeIndexCategory} setActiveIndex={setActiveIndexCategory} />
        <Sort selectedISortType={selectedSortType} setSelectedIndex={setSelectedSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
