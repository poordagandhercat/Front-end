/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/sort-comp */

/*
 * HomePage
 *
 * 编辑Table某一行的数据
 */

import React from 'react';
import { Table, Input, Button, Alert, Divider } from 'antd';
import css from './style.css';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      render: this.renderCol1,
    }, {
      title: 'age',
      dataIndex: 'age',
      width: '25%',
      render: this.renderCol2,
      sorter: this.onSort,
    }, {
      title: 'address',
      dataIndex: 'address',
      width: '25%',
      render: this.renderCol3,
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const status = this.isEditing(record);
        if (status) {
          return (
            <div>
              <a onClick={() => this.save(record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={() => this.cancel(record.key)}>取消</a>
            </div>
          );
        }
        return (
          <div>
            <a onClick={() => this.onRowEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.onDelete(record.key)}>删除</a>
          </div>
        );
      },
      width: '25%',
    }];

    this.state = {
      dataSource: [{
        key: 1,
        name: 'Edward King 0',
        age: '31',
        address: 'London, Park Lane no. 0',
      }, {
        key: 2,
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }, {
        key: 3,
        name: 'Edward King 2',
        age: '33',
        address: 'London, Park Lane no. 2',
      }],
      editing: false,
      selectedRowKeys: [],
      buttonPower: true,

      valueCol1: '',
      valueCol2: '',
      valueCol3: '',
      editingKey: '',
    };
  }

  save = (key) => {
    const { valueCol1, valueCol2, valueCol3, dataSource } = this.state;
    const item = (dataSource || []).find((d) => d.key === key);
    if (item) {
      item.name = valueCol1;
      // 注意此处的方法
      item.age = +valueCol2 || 0;
      item.address = valueCol3;
    }
    this.cancel(key);
  }
  cancel = () => {
    this.setState({ editingKey: '' });
  }

  renderCol1 = (text, record) => {
    const { valueCol1 } = this.state;
    const status = this.isEditing(record);
    return status ? (
      <Input value={valueCol1} onChange={(evt) => this.setState({ valueCol1: evt.target.value })} />
    ) : text;
  }
  renderCol2 = (text, record) => {
    const { valueCol2 } = this.state;
    const status = this.isEditing(record);
    return status ? (
      <Input value={valueCol2} onChange={(evt) => this.setState({ valueCol2: evt.target.value })} />
    ) : text;
  }
  renderCol3 = (text, record) => {
    const { valueCol3 } = this.state;
    const status = this.isEditing(record);
    return status ? (
      <Input value={valueCol3} onChange={(evt) => this.setState({ valueCol3: evt.target.value })} />
    ) : text;
  }

  onSort = (a, b) => {
    // 输出的 a, b 均为单行的行数据
    // console.log(a, b);
  }

  isEditing = (record) => { return +record.key === +this.state.editingKey; };

  onRowEdit(record) {
    this.setState({
      editingKey: record.key,
      valueCol1: record.name || '',
      valueCol2: record.age || '',
      valueCol3: record.address || '',
    });
  }

  onDelete = (key) => {
    console.log('删除的key为', key);
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
