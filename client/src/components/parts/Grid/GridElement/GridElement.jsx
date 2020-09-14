import React from 'react';
import classNames from 'classnames';

import { ReactComponent as RateSVG } from '../../../../svg/rate.svg';
import { ReactComponent as RateCheckedSVG } from '../../../../svg/rate-checked.svg';
import { ReactComponent as ArrowRightSVG } from '../../../../svg/long-arrow-right.svg';

import styles from './gridElement.module.scss';

export default function GridElement(props) {
  const { children } = props;

  return (
    <div className={styles["element"]}>
      {children}
    </div>
  );
}

export function Container(props) {
  const { children } = props;

  return (
    <div className={styles["container"]}>
      {children}
    </div>
  );
}

export function Image(props) {
  const { ...rest } = props;

  return (
    <div className={styles["image-block"]}>
      <div className={styles["image-container"]}>
        <img className={styles["image"]} {...rest} />
        <div className={styles["link-container"]}>
          <div className={styles["link"]}>
            <span className={styles["link-text"]}>more</span>
            <ArrowRightSVG className={styles["link-icon"]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Title(props) {
  const { name, rating, isRated } = props;
  const icon = isRated
    ? <RateCheckedSVG className={styles["rating-svg"]} />
    : < RateSVG className={styles["rating-svg"]} />;

  return (
    <div className={styles["title-block"]}>
      <div className={styles["title"]}>{name}</div>
      <div className={styles["rating"]}>
        <span className={styles["rating-value"]}>{rating}</span>
        <div
          className={classNames(
            styles["rating-icon"],
            { [styles["rated"]]: isRated }
          )}
        >
          {icon}
        </div>
      </div>
    </div>

  );
}

export function Field(props) {
  const { name, value, children } = props;

  return (
    <div className={styles["label"]}>
      <span className={styles["label-name"]}>{name}</span>
      <span className={styles["label-value"]}>{value || children}</span>
    </div>
  );
}

GridElement.Container = Container;
GridElement.Image = Image;
GridElement.Title = Title;
GridElement.Field = Field;