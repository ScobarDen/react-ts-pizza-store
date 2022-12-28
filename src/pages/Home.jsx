import { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilterSlice, statesOfFilters } from '../redux/slices/filterSlice';
import { AppContext } from '../App';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { ERROR, fetchPizzasItems, LOADING, statesOfPizzas } from '../redux/slices/pizzasSlice';
import cartEmptyImg from '../assets/img/empty-cart.png';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { indexOfCategory, sortType, currentPage } = useSelector(statesOfFilters);
  const { pizzasItems, status } = useSelector(statesOfPizzas);
  const { searchValue } = useContext(AppContext);
  const limit = 4;
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const category = indexOfCategory ? `category=${indexOfCategory}` : '';
    const sortBy = `&sortBy=${sortType.sort}&order=${sortType.order}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzasItems({ category, sortBy, search, currentPage, limit }));
    window.scrollTo(0, 0);
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
    const categoryAll = qs.parse(window.location.search.substring(1))?.category;
    if (!isSearch.current || !Number(categoryAll)) {
      getPizzas();
    }

    isSearch.current = false;
  }, [indexOfCategory, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
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

  const pizzas = pizzasItems.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      {status === ERROR ? (
        <div className="cart cart--empty">
          <h2>
            Пицц нет <span>😕</span>
          </h2>
          <p>
            Вероятней всего произошла какая-то ошибка.
            <br />
            Для того, чтобы заказать пиццу, вернитесь попозже.
          </p>
          <img src={cartEmptyImg} alt="Empty cart" />
        </div>
      ) : (
        <>
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{status === LOADING ? skeletons : pizzas}</div>
          <Pagination />
        </>
      )}
    </div>
  );
}

export default Home;
