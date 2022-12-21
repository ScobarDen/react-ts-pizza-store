import styles from './Search.module.scss';
import icon from '../../assets/img/search_icon.svg';

function Search() {
  return (
    <div className={styles.root}>
      <img src={icon} className={styles.icon} alt="search icon"/>
      <input className={styles.input} placeholder="Поиск пиццы..." />
    </div>
  );
}

export default Search;
