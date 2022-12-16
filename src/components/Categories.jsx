import { useState } from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (i) => {
    setActiveIndex(i);
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