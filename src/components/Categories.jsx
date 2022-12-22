import { useDispatch, useSelector } from 'react-redux';
import { setIndexOfCategory } from '../redux/slices/filterSlice';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const activeIndex = useSelector((state) => state.filter.indexOfCategory);
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
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
