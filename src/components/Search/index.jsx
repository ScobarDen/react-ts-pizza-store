import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import { AppContext } from '../../App';
import { useContext } from 'react';

function Search() {
  const { searchValue,setSearchValue } = useContext(AppContext);

  return (
    <div className={styles.root}>
      <img src={searchIcon} className={styles.icon} alt="search icon" />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          src={deleteIcon}
          className={styles.iconDelete}
          alt="deleteIcon"
        />
      )}
    </div>
  );
}

export default Search;
