import React from 'react';
import classNames from 'classnames';

import { ReactComponent as ArrowLeftSVG } from '../../../svg/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../../../svg/arrow-right.svg';

import styles from './pageController.module.scss';

export default function PageController(props) {
  const { visibleRange = 2, currentPage, maxPages, onChange } = props;
  const generateList = () => {
    const setPage = (page) => {
      return (
        <PageButton
          active={page === currentPage}
          value={page}
          onClick={onChange.bind(null, page)}
        />
      );
    };
    const minPageInRange = Math.max(currentPage - visibleRange, 2);
    const maxPageInRange = Math.min(currentPage + visibleRange, maxPages - 1);
    let result = [];

    result.push(<PreviousPage disabled={currentPage === 1}
      onClick={onChange.bind(null, currentPage - 1)} />);
    result.push(setPage(1));

    if (minPageInRange !== 2)
      result.push(<PageButton separator />);

    for (let i = minPageInRange; i <= maxPageInRange; i++)
      result.push(setPage(i));

    if (maxPageInRange !== maxPages - 1)
      result.push(<PageButton separator />);

    result.push(setPage(maxPages));
    result.push(<NextPage disabled={currentPage === maxPages}
      onClick={onChange.bind(null, currentPage + 1)} />);

    return result;
  };

  return (
    <div className={classNames(styles["pagination"], "body-wrapper")}>
      {generateList()}
    </div>
  );
}

function PageButton(props) {
  const { children, value, separator, disabled, active, onClick } = props;
  const body = (
    <div
      className={classNames(
        styles["page-button"],
        { [styles["active"]]: active },
        { [styles["disabled"]]: disabled },
        { [styles["clickable"]]: !separator && !disabled && !active }
      )}
      onClick={!(active || disabled) && onClick}
    >
      {
        separator
          ? "..."
          : value || children
      }
    </div>
  );

  return body;
}

function PreviousPage(props) {
  return (
    <PageButton {...props}>
      <ArrowLeftSVG className={styles["icon"]} />
    </PageButton>
  );
}

function NextPage(props) {
  return (
    <PageButton {...props}>
      <ArrowRightSVG className={styles["icon"]} />
    </PageButton>
  );
}