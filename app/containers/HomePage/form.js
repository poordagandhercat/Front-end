// import React from 'react'
// import PropTypes from 'prop-types'
// import { Card, Icon, Form, Row, Col, DatePicker, Input, Button, message, AutoComplete, Select } from 'antd'
// import Moment from 'moment'

// import './Basic.less'
// import CfdaModal from './CfdaModal'
// import Permission from '@/utils/permission'
// import Api from '@/api/item/item'
// import toast from '@/utils/toaster'
// import shared from '@/utils/shared'
// import date from '@/utils/date'
// import deviceTypeSettingService from '@/api/system/deviceTypeSetting'

// const Option = Select.Option

// class IcsItemInformationBasicForm extends React.Component {
//   state = {
//     // 该数据来自下级组件 CfdaModal 的api请求
//     cfdaData: {},
//     loading: false,
//     editing: false,
//     item: this.props.item,
//     data: this.props.data,
//     permission: this.props.permission,
//     dataSource: [],
//     cfdaKey: '',
//     showModal: false,
//     type: '',
//     deviceTypes: [] // 设备类型列表
//   }
//   componentDidMount = () => {
//     this.state.data && this.getItemBasicInfomation(this.state.data)
//     this.fetchDeviceTypes()
//   }
//   fetchDeviceTypes () {
//     deviceTypeSettingService.fetchDeviceTypes({
//       current: 1,
//       pageSize: 9999
//     }).then(res => {
//       this.setState({
//         deviceTypes: res.data.items || []
//       }, this.resetTypeFieldValue)
//     })
//   }

//   onCFDA = (cfdaData) => {
//     setTimeout(() => {
//       this.setState({ cfdaData });
//     }, 1000);
//   }

//   onEdit = () => {
//     this.setState({ editing: true })
//   }
//   onDeEdit = () => {
//     this.state.data && this.getItemBasicInfomation(this.state.data)
//     this.setState({ editing: false })
//   }
//   componentWillReceiveProps (nextProps) {
//     if ('data' in nextProps && this.state.data !== nextProps.data) {
//       this.setState({
//         data: nextProps.data,
//         permission: nextProps.data.permission,
//         cfdaKey: nextProps.data.basic && nextProps.data.basic.registration_number || '',
//         type: nextProps.data.basic && nextProps.data.basic.type || ''
//       }, this.resetTypeFieldValue)
//       this.getItemBasicInfomation(nextProps.data)
//     }
//   }
//   getItemBasicInfomation = (value) => {
//     let basic = value.basic
//     // this.setState({ type: basic.type })
//     if (basic) {
//       this.props.form.setFieldsValue({
//         name: basic.name,
//         registration_number: basic.registration_number,
//         brand: basic.brand,
//         model: basic.model,
//         manufacturer: basic.manufacturer,
//         serial_number: basic.serial_number,
//         type: basic.type,
//         production_date: Moment(basic.production_date).isValid() ? Moment(date.toLocal(basic.production_date, 'YYYY-MM-DD')) : null
//       })
//     }
//   }
//   handleSearch = (value) => {
//     if (value.length === 0) {
//       this.props.form.setFieldsValue({
//         name: '',
//         model: '',
//         manufacturer: '',
//       })
//     } else {
//       Api.getCfda(value).then(res => {
//         this.setState({dataSource: res.cfdas.map(v => v.registrationNumber) || []})
//       })
//     }
//   }
//   showCfda = (e) => {
//     this.setState({ showModal: true })
//   }
//   hideModel = () => {
//     this.setState({ showModal: false })
//   }
//   regNoSelected = (value) => {
//     Api.getCfda(value).then(res => {
//       let cfda = res.cfdas[0]
//       this.props.form.setFieldsValue({
//         name: cfda.nameZh ? cfda.nameZh : '',
//         model: cfda.model ? cfda.model : '',
//         manufacturer: cfda.manufacturerZh ? cfda.manufacturerZh : ''
//       })
//     })
//   }
//   onSubmit = () => {
//     this.props.form.validateFields((err, values) => {
//       if (err) {
//         return toast(err)
//       }
//       let submit = values
//       submit.production_date = Moment(values.production_date).isValid() ? Moment(values.production_date.format('YYYY-MM-DD 00:00:00')).utc().format('YYYY-MM-DD HH:mm:ss') : ''
//       // 提交参数至服务器
//       let data = {
//         user_id: shared.auth.id,
//         basic: submit
//       }
//       Api.submitItemBasic(shared.organization.id, this.props.item.id, data).then(res => {
//         this.setState({ editing: false })
//         if (res) {
//           message.success('保存成功')
//           this.props.onChange && this.props.onChange()
//         } else {
//           toast(res)
//         }
//       }).catch(res => {
//         toast(res)
//       })
//       .then(res => {
//       })
//     })
//   }
//   resetTypeFieldValue = () => {
//     const { deviceTypes = [], type } = this.state
//     let deviceType = null

//     deviceType = deviceTypes.find(deviceType => deviceType.name === type)

//     if (deviceType && deviceType.code) {
//       this.props.form.setFieldsValue({ type: deviceType.code })
//     }
//   }
//   render () {
//     const { getFieldDecorator } = this.props.form
//     const formItemLayout = {
//       labelCol: { span: 5 },
//       wrapperCol: { span: 18 }
//     }
//     const rightLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 6 },
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 },
//       },
//     };
//     const { cfdaData } = this.state;
//     const medatcdata = (this.props.data.basic || {}).medatcdata || {};
//     const originaldata = (this.props.data.basic || {}).originaldata || {};
//     const newsData = this.state.dataSource.filter((s) => { return s })
//     return (
//       <div className="information-basic" style={{ backgroundColor: '#fff', marginBottom: 10 }}>
//         <div className="caption">
//           <div className="pull-left">基础信息</div>
//           {Permission.has(shared.organization.id, 'item.basic.rw') && (
//             <div className={this.state.editing ? 'pull-left padding-left' : 'padding-left pull-left active'}>
//               { this.state.editing ? <Button type="danger" onClick={() => this.onDeEdit()} size="small" ghost style={{ margin: '0 5px' }}>取消</Button> : null }
//               { this.state.editing ? <Button type="primary" onClick={() => this.onSubmit()} size="small" ghost style={{ margin: '0 5px' }}>保存</Button> : null }
//               { this.state.editing ? null : <a onClick={() => this.onEdit()} className="btn-edit"><Icon type="edit" /></a> }
//             </div>
//           )}
//         </div>
//         <div className="pad ics-basic-form">
//           <Form onSubmit={this.onSubmit} className="pad">
//             <Row>
//               <Col span={16}>
//                 <Row gutter={10} style={{ marginBottom: 10 }}>
//                   <Col span={24} >
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       {...formItemLayout}
//                       label="设备名称"
//                     >
//                       {getFieldDecorator('name', {
//                         rules: [{required: true, message: '设备名称不能为空'}]
//                       })(
//                         this.state.editing ? <Input style={{ width: 300 }} /> : <Input className="ics-view-only" disabled />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={20} style={{ marginBottom: 10 }}>
//                   <Col span={24}>
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       {...formItemLayout}
//                       label="品牌"
//                     >
//                       {getFieldDecorator('brand', {
//                         rules: []
//                       })(
//                         this.state.editing ? <Input style={{ width: 300 }} /> : <Input className="ics-view-only" disabled />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={10} style={{ marginBottom: 10 }}>
//                   <Col span={24}>
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       {...formItemLayout}
//                       label="型号"
//                     >
//                       {getFieldDecorator('model', {
//                         rules: []
//                       })(
//                         this.state.editing ? <Input style={{ width: 300 }} /> : <Input className="ics-view-only" disabled />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={20} style={{ marginBottom: 10 }}>
//                   <Col span={24}>
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       {...formItemLayout}
//                       label="序列号"
//                     >
//                       {getFieldDecorator('serial_number', {
//                         rules: []
//                       })(
//                         this.state.editing ? <Input style={{ width: 300 }} /> : <Input className="ics-view-only" disabled />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={10} style={{ marginBottom: 10 }}>
//                   <Col span={24} >
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       {...formItemLayout}
//                       label="医疗器械注册证号"
//                     >
//                       <a style={this.state.editing ? {display: 'none'} : {padding: 7}} onClick={this.showCfda} >{this.props.data && this.props.data.basic ? this.props.data.basic.registration_number : ''}</a>
//                       {getFieldDecorator('registration_number')(
//                         <AutoComplete
//                           dataSource={newsData}
//                           style={this.state.editing ? {width: 300} : {display: 'none', width: 300}}
//                           disabled={!this.state.editing}
//                           allowClear
//                           onSearch={this.handleSearch}
//                           onSelect={this.regNoSelected}
//                           onClear={this.onClear}
//                         />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={20} style={{ marginBottom: 10 }}>
//                   <Col span={24}>
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       {...formItemLayout}
//                       label="生产厂商"
//                     >
//                       {getFieldDecorator('manufacturer', {
//                         rules: []
//                       })(
//                         this.state.editing ? <Input style={{ width: 300 }} /> : <Input className="ics-view-only" disabled />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={10} style={{ marginBottom: 10 }}>
//                   <Col span={24}>
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       {...formItemLayout}
//                       label="生产日期"
//                     >
//                       <span style={this.state.editing ? {display: 'none'} : {padding: 7}}>{this.props.data.basic && this.props.data.basic.production_date ? date.toLocal(this.props.data.basic.production_date, 'YYYY-MM-DD') : ''}</span>
//                       {getFieldDecorator('production_date', {
//                         rules: []
//                       })(
//                         <DatePicker className="icon-disappear" style={this.state.editing ? {width: 300} : {display: 'none', width: 300}} />
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={20} style={{ marginBottom: 10 }}>
//                   <Col span={24}>
//                     <Form.Item
//                       style={{ width: '100%' }}
//                       label="设备类型"
//                       {...formItemLayout}
//                     >
//                       <span style={this.state.editing ? {display: 'none'} : {padding: 7}}>{this.state.type}</span>
//                       {getFieldDecorator('type', {
//                         rules: []
//                       })(
//                         <Select
//                           style={this.state.editing ? {width: 200} : {display: 'none', width: 200}}
//                         >
//                           {
//                             this.state.deviceTypes.map(deviceType => (
//                               <Option value={deviceType.code} key={deviceType.code}>{deviceType.name}</Option>
//                             ))
//                           }
//                         </Select>
//                       )}
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 {this.state.type === '医疗设备' ? (
//                   <Row gutter={20} style={{ marginBottom: 10 }}>
//                     <Col span={24}>
//                       <Form.Item
//                         style={{ width: '100%' }}
//                         label="注册68分类"
//                         {...formItemLayout}
//                       >
//                         <span style={{padding: 7}}>{cfdaData.registered68Classification}</span>
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 ) : null}
//                 {this.state.type === '医疗设备' ? (
//                   <Row gutter={20} style={{ marginBottom: 10 }}>
//                     <Col span={24}>
//                       <Form.Item
//                         style={{ width: '100%' }}
//                         label="风险等级"
//                         {...formItemLayout}
//                       >
//                         <span style={{padding: 7}}>{cfdaData.riskClassification}</span>
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 ) : null}
//               </Col>
//               <Col span={8} className="right">
//                 <Row gutter={16}>
//                   <Col span={23}>
//                     <Card
//                       size="small"
//                       title="至数信息"
//                       bordered={false}
//                     >
//                       <Form.Item {...rightLayout} label="至数名">{medatcdata.name}</Form.Item>
//                       <Form.Item {...rightLayout} label="品牌">{medatcdata.brand}</Form.Item>
//                       <Form.Item {...rightLayout} label="型号">{medatcdata.model}</Form.Item>
//                     </Card>
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={23}>
//                     <Card
//                       size="small"
//                       title="台账信息"
//                       bordered={false}
//                     >
//                       <Form.Item {...rightLayout} label="台账名">{originaldata.name}</Form.Item>
//                       <Form.Item {...rightLayout} label="生产商">{originaldata.manufacturer}</Form.Item>
//                       <Form.Item {...rightLayout} label="型号">{originaldata.model}</Form.Item>
//                     </Card>
//                   </Col>
//                 </Row>
//               </Col>
//             </Row>
//           </Form>
//           <CfdaModal
//             cfdaKey={this.state.cfdaKey}
//             visible={this.state.showModal}
//             hideModel={this.hideModel}
//             onCFDA={this.onCFDA}
//           />
//         </div>
//       </div>
//     )
//   }
// }

// IcsItemInformationBasicForm.propTypes = {
//   permission: PropTypes.any,
//   item: PropTypes.object,
//   data: PropTypes.object,
//   form: PropTypes.object,
//   onChange: PropTypes.func
// }

// const IcsItemInformationBasic = Form.create()(IcsItemInformationBasicForm)

// export default IcsItemInformationBasic
