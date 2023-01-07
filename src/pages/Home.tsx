import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilterSlice, selectFilters, SortEnum } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import {
  AsyncParams,
  fetchPizzasItems,
  selectPizzas,
  StatusFetch,
} from '../redux/slices/pizzasSlice';
import cartEmptyImg from '../assets/img/empty-cart.png';
import { useAppDispatch } from '../redux/store';

export type ParseParams = {
  category: string;
  limit: string;
  order: 'asc' | 'desc';
  page: string;
  search: string;
  sortBy: SortEnum;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { indexOfCategory, sortType, currentPage, searchValue } = useSelector(selectFilters);
  const { pizzasItems, status } = useSelector(selectPizzas);
  const limit = '4';
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    dispatch(fetchPizzasItems({ indexOfCategory, sortType, searchValue, currentPage, limit }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as ParseParams;
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

  const pizzas = pizzasItems.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      {status === StatusFetch.ERROR ? (
        <div className="cart cart--empty">
          <h2>
            По вашему запросу пицц нет <span>😕</span>
          </h2>
          <p>Произошла ошибка доступа к серверу</p>
          <img src={cartEmptyImg} alt="Empty cart" />
        </div>
      ) : (
        <>
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === StatusFetch.LOADING ? skeletons : pizzas}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Home;
