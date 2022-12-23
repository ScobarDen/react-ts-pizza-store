import { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import { AppContext } from '../../App';

function Search() {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(AppContext);
  const inputRef = useRef(null);
  const clearHandler = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const changeSearchValue = useCallback(
    debounce((val) => {
      setSearchValue(val);
    }, 250),
    [],
  );

  const changeInput = (e) => {
    setValue(e.target.value);
    changeSearchValue(value);
  };

  return (
    <div className={styles.root}>
      <img src={searchIcon} className={styles.icon} alt="search icon" />
      <input
        ref={inputRef}
        value={value}
        onChange={changeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          onClick={clearHandler}
          src={deleteIcon}
          className={styles.iconDelete}
          alt="deleteIcon"
        />
      )}
    </div>
  );
}

export default Search;
