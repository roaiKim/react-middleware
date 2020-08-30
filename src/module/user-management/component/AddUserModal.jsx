import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import './index.less';
// import { actions } from 'module/user-management';
// import { Encrypt, Decrypt } from 'util/secret';

class AddUserModal extends React.PureComponent {
  isEdit;

  constructor(props) {
    super(props);
    this.isEdit = !!this.props.initItem;
  }

  submit = (value) => {
    // eslint-disable-next-line no-console
    console.log('---value------<>', value);
    /* const encryptValue = Encrypt(value.username);
    console.log('---encryptValue------<>', encryptValue);
    const decryptValue = Decrypt(encryptValue);
    console.log('---decryptValue------<>', decryptValue);
    console.error('---decryptValue------<>', decryptValue); */
  };

  render() {
    const { initItem } = this.props;

    return (
      <Modal
        title="新增用户"
        wrapClassName="ro-g-modal-wrap ro-add-user"
        width="60%"
        maskClosable={false}
        visible
        footer={null}
      >
        <Form
          name="add-user"
          initialValues={{ remember: true }}
          onFinish={this.submit}
          layout="inline"
        >
          <Form.Item name="username" initialValue={this.isEdit ? initItem.name : ''} rules={[{ required: true, message: '请输入用户名' }]}>
            <Input size="large" placeholder="用户名" />
          </Form.Item>

          <Form.Item name="username2" initialValue={this.isEdit ? initItem.email : ''} rules={[{ required: true, message: '请输入邮箱' }]}>
            <Input size="large" placeholder="邮箱" />
          </Form.Item>

          <Form.Item name="username3" initialValue={this.isEdit ? initItem.nickName : ''} rules={[{ required: true, message: '请输入昵称' }]}>
            <Input size="large" placeholder="昵称" />
          </Form.Item>

          <Form.Item name="username4" initialValue={this.isEdit ? initItem.phone : ''} rules={[{ required: true, message: '请输入手机号' }]}>
            <Input size="large" placeholder="手机号" />
          </Form.Item>

          {!this.isEdit ? (
            <React.Fragment>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input size="large" placeholder="密码" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[{ required: true, message: '确认密码' }, ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('确认密码和密码不一致'));
                  },
                })]}
              >
                <Input size="large" placeholder="确认密码" />
              </Form.Item>
            </React.Fragment>
          ) : ''}

          <div className="ro-g-modal-button-wrap">
            <Button onClick={() => this.props.closeModal()}>取消</Button>
            <Button type="primary" htmlType="submit">确定</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default AddUserModal;
