import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import './index.less';
import { actions } from 'module/system-management';
import { connect } from 'react-redux';

class AddSystemModal extends React.PureComponent {
  isEdit;

  constructor(props) {
    super(props);
    this.isEdit = !!this.props.initItem;
  }

  submit = ({ url, name, array }) => {
    const request = { url, name, array };
    const { initItem } = this.props;
    if (initItem) {
      request.code = initItem.code;
    }
    this.props.dispatch(actions.addSystem(request, this.props.closeModal));
  };

  render() {
    const { initItem } = this.props;

    return (
      <Modal
        title="新增用户"
        wrapClassName="ro-g-modal-wrap ro-add-system"
        width="60%"
        maskClosable={false}
        visible
        onCancel={this.props.closeModal}
        footer={null}
      >
        <Form
          name="add-system"
          initialValues={{ remember: true }}
          onFinish={this.submit}
          layout="inline"
        >
          <Form.Item name="name" initialValue={this.isEdit ? initItem.name : ''} rules={[{ required: true, message: '请输入系统名称' }]}>
            <Input size="large" placeholder="系统名称" />
          </Form.Item>

          <Form.Item name="url" initialValue={this.isEdit ? initItem.url : ''} rules={[{ required: true, message: '请输入系统地址' }]}>
            <Input size="large" placeholder="系统地址" />
          </Form.Item>

          <Form.Item name="array" initialValue={this.isEdit ? initItem.UsersGroup.join(',') : ''}>
            <Input size="large" placeholder="用户组 不填默认全部用户" />
          </Form.Item>

          <div className="ant-row ant-form-item" />
          <div className="ro-g-modal-button-wrap">
            <Button onClick={() => this.props.closeModal()}>取消</Button>
            <Button type="primary" htmlType="submit">确定</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default connect()(AddSystemModal);
