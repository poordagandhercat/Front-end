/*
 * HomePage
 *
 * 编辑Table所有行数据
 */

import React from 'react';
import css from './style.css';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={css.box}>
        <div className={css.up}>
          <div className={css.cro_left_bottom}></div>
          <div className={css.cro_right_bottom}></div>
        </div>

        <div className={css.down}>
          <div className={css.cro_left_top}></div>
          <div className={css.cro_right_top}></div>
        </div>

        <h1 className={css.text}>Download the Client Sheet <a>logo</a></h1>
      </div>
    );
  }
}
