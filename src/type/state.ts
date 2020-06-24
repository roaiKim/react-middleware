import { State } from 'core';
import { State as HomeState } from 'module/home/type';
import { State as MainState } from 'module/main/type';
import { State as UserState } from 'module/user-management/type';

export interface RootState extends State {
  app: {
    main: MainState,
    home: HomeState;
    userManagement: UserState;
  };
}
