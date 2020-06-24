import React from 'react';
import { showLoading, async, Route } from 'core';
import { connect } from 'react-redux';
import { RootState } from 'type/state';
import { Switch } from 'react-router-dom';
import { ModuleLoader } from 'service/ModuleLoader';
import LoadingComponent from './LoadingComponent';
import MainLayout from './Main';
import './index.less';

interface Props {
  showGlobalLoading: boolean;
  showMaskLoading: boolean;
  currentUser: string | null;
}

// const login = async(ModuleLoader.login, 'MainComponent');
const login = async(ModuleLoader.login, 'MainComponent');

class Component extends React.PureComponent<Props> {
  render() {
    const { showGlobalLoading, currentUser, showMaskLoading } = this.props;

    return (
      <main>
        {(showGlobalLoading || showMaskLoading) && <LoadingComponent type={showMaskLoading} />}
        <Switch>
          <Route path="/login" component={login} />
          <Route component={currentUser ? MainLayout : login} />
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = (state: RootState): Props => ({
  showGlobalLoading: showLoading(state),
  showMaskLoading: showLoading(state, 'mask'),
  currentUser: state.app.main.user,
});

export default connect(mapStateToProps)(Component);
