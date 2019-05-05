/*
 * HomePage
 *
 * antd Table的全选与部分选中和取反
 * 简易的单条数据删除
 */

import React from 'react';
import { Table, Button, Alert } from 'antd';
import css from './style.css';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    }, {
      title: 'age',
      dataIndex: 'age',
      width: '25%',
    }, {
      title: 'address',
      dataIndex: 'address',
      width: '25%',
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <a onClick={() => this.onDelete(record.key)}>Delete</a>
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
      editing: false,
      selectedRowKeys: [],
      buttonPower: true,
    };
  }

  onDelete = (key) => {
    console.log(key);
    const d = [...this.state.dataSource];
    this.setState({
      dataSource: d.filter((item) => item.key !== key),
    });
  }

  onRenderMsg(count, self) {
    return (
      <div>
        已选择 {count} 项
        <a
          onClick={() => { self.setState({ selectedRowKeys: [], buttonPower: true }); self.onCleanSelected(); }}
          role="link"
          tabIndex="0"
        >
          &nbsp;清空
        </a>
      </div>
    );
  }

  // 用来清除已选择的批量行数据
  onCleanSelected = () => {
    this.setState({ selectedRowKeys: [] });
  };

  onChangeSelected = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    const buttonPower = selectedRowKeys.length === 0;
    this.setState({ selectedRowKeys, buttonPower });
  };

  render() {
    const { selectedRowKeys, buttonPower } = this.state;
    const selectedCount = selectedRowKeys.length;

    return (
      <div className={css.home}>
        <h1>Home Page.</h1>
        <p>
          <b>批量操作：</b>
          <Button type="primary" disabled={buttonPower}>修改</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary">待定</Button>
        </p>
        {selectedCount ? (
          <Alert
            showIcon
            type="info"
            style={{ margin: '16px 0' }}
            message={this.onRenderMsg(selectedCount, this)}
          />
        ) : null}
        <Table
          bordered
          columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={{ selectedRowKeys, onChange: this.onChangeSelected }}
        />
      </div>

    );
  }
}
