import React from 'react';
import { Result, Button } from 'antd';
import { actions } from 'module/404';
import './index.less';

class Main extends React.PureComponent {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => this.props.dispatch(actions.pushHistoryToHome())}>Back Home</Button>}
      />
    );
  }
}

export default Main;
