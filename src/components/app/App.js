import React from 'react';
import styles from './App.module.css';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Button, Icon, Layout} from 'antd';
import LoginForm from '../LoginForm/LoginForm';
import {logout} from '../../actions/user';
import ConcertPage from '../concerts/ConcertPage';
import {load} from '../../actions/data';

import SkLogo from './powered-by-songkick-white.svg';

const {Header, Footer, Content} = Layout;

function App({user, logout, load, loading}) {
  let page, actionsBlock;

  if (user.name) {
    page = <ConcertPage/>;
    actionsBlock = <div>
      <Button onClick={logout}>
        <Icon type='user'/> <b>{user.name}</b>: Log Out
      </Button>
      <Button style={{marginLeft: 20}} disabled={loading}
              onClick={() => load(user.name)}>
        <Icon type='reload'/> Reload Concerts
      </Button>
    </div>;
  } else {
    page = <LoginForm/>;
    actionsBlock = <div></div>;
  }

  return (
    <Layout>
      <Header className={styles.header}>
        {actionsBlock}
        <a href='https://www.songkick.com/' rel='noopener noreferrer' target='_blank'>
          <img src={SkLogo} alt='Powered by Songkick.com' height='50px'/>
        </a>
      </Header>
      <Layout>
        <Content style={{padding: '11px 50px'}}>
          {page}
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
  user: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.object
  }).isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({user, data}) => ({user, loading: data.loading});

export default connect(mapStateToProps, {logout, load})(App);