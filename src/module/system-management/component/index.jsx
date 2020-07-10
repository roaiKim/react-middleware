import React from 'react';
import { Form, Input, Button, Table, Tag, Tooltip } from 'antd';
import './index.less';
import { ColumnsType } from 'antd/lib/table';
import { connect, DispatchProp } from 'react-redux';
import { actions } from 'module/system-management';
import { DocTitle } from 'util/decorator';
import AddSystemModal from './AddSystemModal';
 
class Main extends React.PureComponent {
  columns = [
    {
      title: '系统名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '系统地址',
      dataIndex: 'url',
      align: 'center',
    },
    {
      title: 'Access Token',
      dataIndex: 'accessToken',
      align: 'center',
    },
    {
      title: '用户组',
      dataIndex: 'UsersGroup',
      align: 'center',
      render: (UsersGroup) => {
        if (UsersGroup.length) {
          return UsersGroup.map(({ roleCode, email, nickname, phone }) => (
            <Tooltip key={nickname} title={this.usersGroupTooltip({ roleCode, email, phone })}>
              <Tag>{nickname}</Tag>
            </Tooltip>
          ));
        }
        return '';
      },
    },
    {
      title: '状态',
      dataIndex: 'valid',
      align: 'center',
    },
    {
      title: '操作',
      key: 'operate',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => this.userEdit(record)}>编辑</Button>
          <Button type="link" onClick={() => this.userFreeze(record)}>下架</Button>
        </div>
      ),
      align: 'center',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      systemItem: null,
    };
  }

  @DocTitle('系统接入')
  componentDidMount() {}

  usersGroupTooltip = ({ roleCode, email, phone }) => (
    <div>
      <div>{roleCode}</div>
      <div>{email}</div>
      <div>{phone}</div>
    </div>
  );

  // 冻结
  userFreeze = (record) => {
    this.props.dispatch(actions.userFreeze(record.code));
  };

  // 编辑
  userEdit = (record) => {
    this.setState({ show: true, systemItem: record });
  };

  closeModal = () => {
    this.setState({ show: false, systemItem: null });
  };

  submit = (value) => {
    this.props.dispatch(actions.fetchSystemManagement({ keyword: value.keyword }));
  };

  render() {
    const { systemList } = this.props;
    const { show, systemItem } = this.state;

    return (
      <div className="ro-system-mangagement">
        <div className="ro-system-mangagement-filter">
          <Form
            name="system-form"
            initialValues={{ remember: true }}
            onFinish={this.submit}
            layout="inline"
          >
            <Form.Item name="keyword">
              <Input size="large" placeholder="系统关键信息" />
            </Form.Item>

            <div className="ro-button-wrap">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button type="primary" onClick={() => this.setState({ show: true })}>新增系统</Button>
            </div>
          </Form>
        </div>
        <div className="ro-system-mangagement-body">
          <Table rowKey="id" columns={this.columns} dataSource={systemList && systemList.list } pagination={false} />
        </div>
        {show && <AddSystemModal initItem={systemItem} closeModal={this.closeModal} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  systemList: state.app.systemManagement.systemManagement,
});

export default connect(mapStateToProps)(Main);
