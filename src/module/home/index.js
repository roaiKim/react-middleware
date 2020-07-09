import { Module, register } from 'react-basc';
import Main from './component';

class MainModule extends Module {}

const module = register(new MainModule('home', initialState));
export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
