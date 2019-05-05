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
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      }],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  render() {
    return (
      <h1 className={css.home}>
        Home Page.
        <div><Button type="primary" onClick={this.toSee}>Antd Button</Button></div>
        <div id="main" style={{ width: '600px', height: '400px', margin: '20px auto' }}></div>
      </h1>
    );
  }
}
