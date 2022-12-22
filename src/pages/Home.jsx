import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';
import { useSelector } from 'react-redux';
import { selectFilter } from '../redux/slices/filterSlice';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { indexOfCategory, sortType } = useSelector(selectFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(AppContext);

  const category = indexOfCategory ? `category=${indexOfCategory}` : '';
  const sortBy = `&sortBy=${sortType.sort}&order=${sortType.order}`;
  const search = searchValue ? `&search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?${category}${sortBy}${search}&page=${currentPage}&limit=4`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [indexOfCategory, sortType, searchValue, currentPage, category, search, sortBy]);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={setCurrentPage} />
    </div>
  );
}

export default Home;
