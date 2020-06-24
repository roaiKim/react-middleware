import React from 'react';
import {
  Form, Input, Button, Table,
} from 'antd';
import './index.less';
import { Store } from 'rc-field-form/lib/interface.d';
import { ColumnsType } from 'antd/lib/table';
import { UserManagement, UserFetchManagement } from 'type/api';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from 'type/state';
import { actions } from 'module/user-management';
import { Encrypt, Decrypt } from 'util/secret';

export interface LoginAJAXRequest {
  username: string;
  password: string;
}

interface Props extends DispatchProp {
  userList: UserFetchManagement | null
}

interface State {
  show: boolean
}

class Main extends React.PureComponent<Props, State> {
  columns: ColumnsType<UserManagement> = [
    {
      title: '用户ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '操作',
      key: 'operate',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => this.resetPassword(record)}>重置密码</Button>
          <Button type="link" onClick={() => this.userFreeze(record)}>冻结</Button>
          <Button type="link" onClick={() => this.userEdit(record)}>编辑</Button>
        </div>
      ),
      align: 'center',
    },
  ];

  // 重置密码
  resetPassword = (record: UserManagement) => {
    this.props.dispatch(actions.userResetPassword(record.id));
  };

  // 冻结
  userFreeze = (record: UserManagement) => {
    this.props.dispatch(actions.userFreeze(record.id));
  };

  // 编辑
  userEdit = (record: UserManagement) => {
    this.props.dispatch(actions.userFreeze(record.id));
  };

  submit = (value: Store) => {
    console.log('---value------<>', value);
    const encryptValue = Encrypt(value.username);
    console.log('---encryptValue------<>', encryptValue);
    const decryptValue = Decrypt(encryptValue);
    console.log('---decryptValue------<>', decryptValue);
  };

  render() {
    const { userList } = this.props;
    return (
      <div className="ro-user-mangagement">
        <div className="ro-user-mangagement-filter">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.submit}
            layout="inline"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户关键信息!' }]}
            >
              <Input size="large" placeholder="用户关键信息" />
            </Form.Item>
            <div className="ro-button-wrap">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="primary">新增用户</Button>
            </div>
          </Form>
        </div>
        <div className="ro-user-mangagement-body">
          <Table rowKey="id" columns={this.columns} dataSource={userList?.list} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userList: state.app.userManagement.userManagement,
});

export default connect(mapStateToProps)(Main);
