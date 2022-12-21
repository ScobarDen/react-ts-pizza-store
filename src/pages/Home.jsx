import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

function Home({ searchValue }) {
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
  const search = searchValue ? `&search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?${category}${sortBy}${search}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [activeIndexCategory, selectedSortType, searchValue]);

  // const filteredPizzas = searchValue
  //   ? items.filter((pizza) => pizza?.title.toLowerCase().includes(searchValue.trim().toLowerCase()))
  //   : items;

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeIndex={activeIndexCategory} setActiveIndex={setActiveIndexCategory} />
        <Sort selectedISortType={selectedSortType} setSelectedIndex={setSelectedSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination itemsPerPage={pizzas} />
    </div>
  );
}

export default Home;
