import { Module, register, Lifecycle, Loading } from 'react-basc';
import { UserService } from 'service/api/UserService';
import { message } from 'antd';
import { WithConfirm } from 'util/decorator';
import Main from './component';

const initialState = {
  userManagement: null,
};

class MainModule extends Module {
  @Lifecycle()
  @Loading()
  async onRender() {
    this.fetchUserManagement();
  }

  @Loading()
  async fetchUserManagement() {
    const response = await UserService.fetchUserManagement();
    this.setState({ userManagement: response.data });
  }

  @Loading()
  @WithConfirm('确定冻结该用户?')
  async userFreeze(id) {
    const response = await UserService.userFreeze(id);
    if (response.code === 0) {
      this.fetchUserManagement();
      message.success('操作成功');
    }
  }

  @Loading()
  @WithConfirm('确定重置该用户的密码?')
  async userResetPassword(id) {
    const response = await UserService.userFreeze(id);
    if (response.code === 0) {
      this.fetchUserManagement();
      message.success('操作成功');
    }
  }
}

const module = register(new MainModule('userManagement', initialState));
export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
