import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { setFilterSlice, statesOfFilters } from '../redux/slices/filterSlice';
import { AppContext } from '../App';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { indexOfCategory, sortType, currentPage } = useSelector(statesOfFilters);
  const { searchValue } = useContext(AppContext);
  const limit = 4;
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = indexOfCategory ? `category=${indexOfCategory}` : '';
    const sortBy = `&sortBy=${sortType.sort}&order=${sortType.order}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?${category}${sortBy}${search}&page=${currentPage}&limit=${limit}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sort === params.sortBy);
      dispatch(
        setFilterSlice({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current){
      fetchPizzas();
    }

    isSearch.current = false;
    console.log(indexOfCategory)
  }, [indexOfCategory, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current){
      const queryString = qs.stringify({
        category: indexOfCategory,
        sortBy: sortType.sort,
        order: sortType.order,
        search: searchValue,
        page: currentPage,
        limit,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [indexOfCategory, sortType, searchValue, currentPage]);

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
      <Pagination />
    </div>
  );
}

export default Home;
