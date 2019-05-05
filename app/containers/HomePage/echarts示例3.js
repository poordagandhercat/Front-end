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
    echarts.init(document.getElementById('main')).setOption({
    title: {text: 'Line Chart'},
    tooltip: {},
    toolbox: {
        feature: {
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            },
            restore: {}
        }
    },
    xAxis: {},
    yAxis: {},
    series: [{
        type: 'line',
        smooth: true,
        // data为坐标
        data: [[12, 5], [24, 20], [36, 36], [48, 10], [60, 10], [72, 20]]
    }]
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
