import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const clearHandler = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const changeSearchValue = useCallback(
    debounce((val) => {
      dispatch(setSearchValue(val));
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
