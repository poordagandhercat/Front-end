/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/sort-comp */

/*
 * HomePage
 *
 * 编辑Table所有行数据
 */

import React from 'react';
import { Table, Input, Button } from 'antd';
import css from './style.css';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      render: this.renderCol,
    }, {
      title: 'age',
      dataIndex: 'age',
      width: '25%',
      render: this.renderCol,
    }, {
      title: 'address',
      dataIndex: 'address',
      width: '25%',
      render: this.renderCol,
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <a onClick={() => this.onDelete(record.key)}>删除</a>
      ),
      width: '25%',
    }];

    this.state = {
      dataSource: [{
        key: 1,
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: 2,
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }, {
        key: 3,
        name: 'Edward King 2',
        age: '32',
        address: 'London, Park Lane no. 2',
      }],

      valueCol: '',
      status: false,
    };
  }

  changeAll = () => {
    this.renderCol(...true);
  }

  renderCol = (text, status) => {
    const { valueCol } = this.state;
    return status ? (
      <Input value={valueCol} onChange={(evt) => this.setState({ valueCol1: evt.target.value })} />
    ) : text;
  }

  onDelete = (key) => {
    console.log('删除的key为', key);
    const d = [...this.state.dataSource];
    this.setState({
      dataSource: d.filter((item) => item.key !== key),
    });
  }
  render() {
    return (
      <div className={css.home}>
        <h1>Home Page.</h1>
        <p>
          <Button type="primary" onClick={() => this.changeAll}>修改</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" >保存</Button>
        </p>
        <Table
          bordered
          columns={this.columns}
          dataSource={this.state.dataSource}
        />
      </div>

    );
  }
}
