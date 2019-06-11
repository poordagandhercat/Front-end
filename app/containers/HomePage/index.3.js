/*
 * HomePage
 *
 * 圆角内切
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

// 以下代码为相关样式
// .box {
//   width: 820px;
//   height: 70px;
//   margin: 100px auto;
//   position: relative;
// }
// .up {
//   width: 820px;
//   height: 35px;
//   background: #820;
//   position: relative;
// }
// .down {
//   width: 820px;
//   height: 35px;
//   background: #820;
//   position: relative;
// }
// .text {
//   color: #fff;
//   position: absolute;
//   top: 20%;
//   left: 25%;
// }

// .cro_left_top,.cro_right_top,.cro_left_bottom,.cro_right_bottom {
//   position: absolute;
//   width: 12px;
//   height: 12px;
//   border: 1px solid #fff;
//   z-index: 1;
//   background: #fff;
// }

// .cro_left_top {
//   top: -1px;
//   left: -1px;
//   border-radius:0px 0px 20px 0px;
//   /* border-bottom: 1px solid #58C4E6;
//   border-right: 1px solid #58C4E6; */
// }

// .cro_right_top {
//   top: -1px;
//   right: -1px;
//   border-radius:0px 0px 0px 20px;
//   /* border-bottom: 1px solid #58C4E6;
//   border-left: 1px solid #58C4E6; */
// }

// .cro_left_bottom {
//   left: -1px;
//   bottom: -1px;
//   border-radius:0px 20px 0px 0px;
//   /* border-top: 1px solid #58C4E6;
//   border-right: 1px solid #58C4E6; */
// }

// .cro_right_bottom {
//   right: -1px;
//   bottom: -1px;
//   border-radius:20px 0px 0px 0px;
//   /* border-top: 1px solid #58C4E6;
//   border-left: 1px solid #58C4E6; */
// }
