/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout, Menu, Icon, Breadcrumb } from 'antd';

import LeftMenu from './leftMenu';

import HomePage from 'containers/HomePage/Loadable';
import GithubPage from 'containers/GithubPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const { Header, Content, Footer } = Layout;
export default function App() {
  return (
    <Layout>
      <LeftMenu />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <Breadcrumb style={{ margin: '16px 0 0 220px' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {/* <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '24px 24px 0' }}>
          <div style={{ padding: 24, marginLeft: 200, background: '#fff', height: '810px' }}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/github" component={GithubPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
