import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Layout} from 'antd';
import LoginForm from '../LoginForm/LoginForm';
import ConcertPage from '../concerts/ConcertPage';
import AppHeader from '../header/AppHeader';
import styles from './App.module.css';

const {Header, Footer, Content} = Layout;

function App({authenticated}) {
  return (
    <Layout>
      <Header>
        <AppHeader/>
      </Header>
      <Layout>
        <Content className={styles.content}>
          {
            authenticated ?
              <ConcertPage/> :
              <LoginForm/>
          }
        </Content>
      </Layout>
      <Footer>
        <span style={{color: '#000'}}>🤟 😎 🎸</span>
        <span>v{process.env.REACT_APP_VERSION}</span>
      </Footer>
    </Layout>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({user}) => ({authenticated: Boolean(user.name)});

export default connect(mapStateToProps)(App);