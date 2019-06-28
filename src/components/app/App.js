import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Layout} from 'antd';
import AppHeader from '../header/AppHeader';
import styles from './App.module.css';
import Loading from '../common/Loading';

const {Header, Footer, Content} = Layout;
const LazyLoginForm = React.lazy(() => import('../LoginForm/LoginForm'));
const LazyConcertPage = React.lazy(() => import('../concerts/ConcertPage'));

function App({authenticated}) {
  return (
    <Layout>
      <Header>
        <AppHeader/>
      </Header>
      <Layout>
        <Content className={styles.content}>
          <Suspense fallback={<Loading/>}>
            {
              authenticated ?
                <LazyConcertPage/> :
                <LazyLoginForm/>
            }
          </Suspense>
        </Content>
      </Layout>
      <Footer>
        <span role="img" aria-label="Heavy metal">🤟</span>
        <span role="img" aria-label="Coll face">😎</span>
        <span role="img" aria-label="Rock'n'Roll">🎸</span>
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