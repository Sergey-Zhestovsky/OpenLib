import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import Input from '../../../utils/Input/Input';
import { ReactComponent as SearchSVG } from '../../../../svg/search.svg';

import styles from './search.module.scss';

export default function Search(props) {
  const {
    className,
    searchClassName,
    placeholder = "Search...",
    ...rest
  } = props;
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={classNames(
        styles["search"],
        className,
        isFocused && styles["focused"]
      )}
      onClick={(e) => inputRef.current.focus()}
    >
      <Input
        className={classNames(styles["input"], searchClassName)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        ref={inputRef}
        {...rest}
      />
      <div className={styles["search-icon"]}>
        <SearchSVG className={styles["search-icon-svg"]} />
      </div>
    </div>
  );
}