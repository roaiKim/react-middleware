import React from 'react';
import { showLoading, async, Route } from 'react-basc';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ModuleLoader } from 'service/ModuleLoader';
import { ConfigProvider } from 'antd';
import LoadingComponent from './LoadingComponent';
import MainLayout from './Main';
import './index.less';
 
// const login = async(ModuleLoader.login, 'MainComponent');
const login = async(ModuleLoader.login, 'MainComponent');

class Component extends React.PureComponent {
  render() {
    const { showGlobalLoading, currentUser, showMaskLoading } = this.props;
    
    return (
      <ConfigProvider input={{ autoComplete: 'off' }}>
        <main>
          {(showGlobalLoading || showMaskLoading) && <LoadingComponent type={showMaskLoading} />}
          <Switch>
            <Route path="/login" component={login} />
            <Route component={currentUser ? MainLayout : login} />
          </Switch>
        </main>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  showGlobalLoading: showLoading(state),
  showMaskLoading: showLoading(state, 'mask'),
  currentUser: state.app.main.user,
});

export default connect(mapStateToProps)(Component);
