/* eslint-disable jsx-a11y/alt-text */
/*
 * HomePage
 *
 * 前端实现HTML转PDF下载
 */

import React from 'react';

import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';

// import { Layout } from 'antd';

import css from './style.css';

class HomePage extends React.Component {
  state = {
    // 错误边界
    error: null,
    login: false,
    dataList: Array(80).fill(0).map((d, i) => ({
      id: i,
      name: '根管测量仪',
      code: '08105177',
      source: '937340',
      qrcode: 'https://oss.mofoun.com/pub/img/icon/qrcode.png',
      brand: '马达',
      model: 'X-SMART',
      department: '牙科',
      admin: '张天良',
    })),
  };

  componentDidMount() {
    // setTimeout(this.getPdf, 10000);
  }

  // eslint-disable-next-line react/sort-comp
  getPdf = () => {
    const { dataList } = this.state;
    // console.time('耗时：');
    html2Canvas(document.getElementById('pdf'), {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const { width, height } = canvas;

      const a4Width = 595.28;
      const a4Height = 841.89;

      // 按A4比例缩放后 canvas 的高度
      const realHeight = height * (a4Width / width);

      // 将A4比例的
      const pageData = canvas.toDataURL('image/jpeg', 1.0);

      const PDF = new JsPDF('', 'pt', 'a4');

      if (height < (a4Height * (width / a4Width))) {
        PDF.addImage(pageData, 'JPEG', 0, 0, a4Width, realHeight);
      } else {
        let remain = realHeight;
        let position = 0;

        while (remain > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, a4Width, realHeight);
          remain -= a4Height;
          position -= a4Height;
          if (remain > 0) {
            PDF.addPage();
          }
        }
      }

      PDF.save(`${dataList.length}个二维码.pdf`);
      // console.timeEnd('耗时：');
    });
  };

  onLogin = () => this.setState({ login: true });

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-param-reassign
    error.stack = info.componentStack;
    this.setState({ error });
  }

  renderLeft = (item) => (
    <div className={css.left}>
      <img src={item.qrcode} crossOrigin="Anonymous" />
      <small>{item.source}</small>
    </div>
  );

  renderRight = (item) => (
    <div className={css.right}>
      <div>设备品牌：{item.brand}</div>
      <div>设备型号：{item.model}</div>
      <div>使用科室：{item.department}</div>
      <div>设备责任人：{item.admin}</div>
    </div>
  );

  render() {
    const {
      // error,
      // login,
      dataList,
    } = this.state;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={css.app} id="pdf" onClick={this.getPdf}>
        {dataList.map((item) => (
          <div className={css.card} key={item.id}>
            <div className={css.head}>
              <h4>{item.name}</h4>
              <h4>{item.code}</h4>
            </div>
            <div className={css.body}>
              {item.reverse ? this.renderRight(item) : null}
              {item.reverse ? this.renderLeft(item) : null}
              {!item.reverse ? this.renderLeft(item) : null}
              {!item.reverse ? this.renderRight(item) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default HomePage;
