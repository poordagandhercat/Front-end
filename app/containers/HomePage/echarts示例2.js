/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Button } from 'antd';

import * as echarts from 'echarts';

import css from './style.css';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  toSee = () => {
    // 绘制图表。
    echarts.init(document.getElementById('main')).setOption({
        series: {
            type: 'pie',
            // radius 可以设置饼图大小
            radius: '55%',
            // roseType 显示成南丁格尔图
            roseType: 'angle',
            // 设置阴影
            itemStyle: {
              // 阴影的大小
              shadowBlur: 200,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            data: [
              // value值为数字，可以任意取值
              {name: 'A', value: 1212},
              {name: 'B', value: 2323},
              {name: 'C', value: 1919}
            ]
        }
    });
  }

  render() {
    return (
      <h1 className={css.home}>
        Home Page.
        <div><Button type="primary" onClick={this.toSee}>Antd Button</Button></div>
        <div id="main" style={{width:'600px',height:'400px',margin:'20px auto'}}></div>
      </h1>
    );
  }
}
