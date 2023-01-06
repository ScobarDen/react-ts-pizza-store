import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setIndexOfCategory } from '../redux/slices/filterSlice';
import React from "react";

const Categories: React.FC = () => {
  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const { indexOfCategory } = useSelector(selectFilters);
  const dispatch = useDispatch();

  const onClickCategory = (i: number) => {
    dispatch(setIndexOfCategory(i));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={indexOfCategory === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
