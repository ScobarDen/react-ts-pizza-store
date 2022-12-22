import { useDispatch, useSelector } from 'react-redux';
import {statesOfFilters, setIndexOfCategory} from '../redux/slices/filterSlice';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const { indexOfCategory } = useSelector(statesOfFilters);
  const dispatch = useDispatch();

  const onClickCategory = (i) => {
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
