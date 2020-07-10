import { Module, register, Lifecycle, Loading } from 'react-basc';
import { SystemService } from 'service/api/SystemService';
import { createSuccessMessage } from 'util/ui/message';
import { WithConfirm } from 'util/decorator';
import Main from './component';

const initialState = {
  systemManagement: null,
};

class MainModule extends Module {
  @Lifecycle()
  @Loading()
  onRender() {
    this.fetchSystemManagement({});
  }

  @Loading()
  async fetchSystemManagement(request) {
    const response = await SystemService.fetchSystemManagement(request);
    this.setState({ systemManagement: response.data });
  }

  @Loading()
  @WithConfirm('确定下架该系统?')
  async userFreeze(code) {
    const response = await SystemService.systemFreeze({ code });
    if (response.code === 0) {
      this.fetchSystemManagement({});
      createSuccessMessage('操作成功');
    }
  }

  @Loading()
  async addSystem(request, callback) {
    const response = await SystemService.addSystem(request);
    if (response.code === 0) {
      this.fetchSystemManagement({});
      createSuccessMessage('操作成功');
      if (callback) callback();
    }
  }
}

const module = register(new MainModule('systemManagement', initialState));
export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
