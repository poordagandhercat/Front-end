/*
 * HomePage
 *
 * 编辑Table所有行数据
 */

import React from 'react';
import { Table, Input, Button } from 'antd';
import css from './style.css';

// eslint-disable-next-line consistent-return
const EditableCell = ({ editable, value, onChange }) => {
  if (!editable) {
    return (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={(e) => onChange(e.target.value)} />
    );
  }
  if (!value) {
    return '';
  }
  // return (
  //   <div>
  //     {value.split(/\n/).map((d, i) => <div key={i}>{d}</div>)}
  //   </div>
  // );
};

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    // this.columns = [{
    //   title: 'name',
    //   dataIndex: 'name',
    //   width: '25%',
    //   editable: true,
    //   render: this.renderCol,
    // }, {
    //   title: 'age',
    //   dataIndex: 'age',
    //   width: '25%',
    //   render: this.renderCol,
    // }, {
    //   title: 'address',
    //   dataIndex: 'address',
    //   width: '25%',
    //   render: this.renderCol,
    // }, {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (text, record) => (
    //     <a onClick={() => this.onDelete(record.key)}>删除</a>
    //   ),
    //   width: '25%',
    // }];

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

      // 点击修改的button按钮时的状态
      change: false,
    };
  }

  // eslint-disable-next-line react/sort-comp
  changeAll = () => {
    this.setState({ change: true });
  }

  // eslint-disable-next-line arrow-body-style
  renderCol = (text, record) => {
    return (<EditableCell
      editable={!!this.state[record.key]}
      value={text}
      onChange={(value) => this.doChange(value)}
    />);
  }
  doChange = () => {

  }

  onDelete = (key) => {
    // console.log('删除的key为', key);
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
          <Button type="primary" onClick={() => this.changeAll()}>修改</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" >保存</Button>
        </p>
        <Table
          bordered
          columns={this.columns}
          dataSource={this.state.dataSource}
        >
          <Table.Column
            title="name"
            dataIndex="name"
            width="25%"
            editable={'true'}
            render={(text, record) => this.renderCol(text, record, 'name')}
          />
          <Table.Column
            title="age"
            dataIndex="age"
            width="25%"
            render={(text, record) => this.renderCol(text, record, 'age')}
          />
          <Table.Column
            title="address"
            dataIndex="address"
            width="25%"
            render={(text, record) => this.renderCol(text, record, 'address')}
          />
          <Table.Column
            title="operation"
            dataIndex="operation"
            width="25%"
            render={(text, record) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <a onClick={() => this.onDelete(record.key)}>删除</a>
            )}
          />
        </Table>
      </div>

    );
  }
}
