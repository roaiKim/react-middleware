import React from 'react';
import { Form, Input, Button, Table } from 'antd';
import './index.less';
import { connect } from 'react-redux';
import { actions } from 'module/user-management';
import { Encrypt, Decrypt } from 'util/secret';
import { DocTitle } from 'util/decorator';
import AddUserModal from './AddUserModal';

class Main extends React.PureComponent {
  columns = [
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

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userItem: null,
    };
  }

  @DocTitle('用户管理')
  componentDidMount() {}

  // 重置密码
  resetPassword = (record) => {
    this.props.dispatch(actions.userResetPassword(record.id));
  };

  // 冻结
  userFreeze = (record) => {
    this.props.dispatch(actions.userFreeze(record.id));
  };

  // 编辑
  userEdit = (record) => {
    this.setState({ show: true, userItem: record });
  };

  submit = (value) => {
    console.log('---value------<>', value);
    const encryptValue = Encrypt(value.username);
    console.log('---encryptValue------<>', encryptValue);
    const decryptValue = Decrypt(encryptValue);
    console.log('---decryptValue------<>', decryptValue);
  };

  closeModal = () => {
    this.setState({ show: false, userItem: null });
  };

  render() {
    const { userList } = this.props;
    const { show, userItem } = this.state;

    return (
      <div className="ro-user-mangagement">
        <div className="ro-user-mangagement-filter">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.submit}
            layout="inline"
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户关键信息!' }]}>
              <Input size="large" placeholder="用户关键信息" />
            </Form.Item>

            <div className="ro-button-wrap">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="primary" onClick={() => this.setState({ show: true })}>新增用户</Button>
            </div>
          </Form>
        </div>
        <div className="ro-user-mangagement-body">
          <Table rowKey="id" columns={this.columns} dataSource={userList && userList.list} />
        </div>
        {show && <AddUserModal initItem={userItem} closeModal={this.closeModal} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.app.userManagement.userManagement,
});

export default connect(mapStateToProps)(Main);
