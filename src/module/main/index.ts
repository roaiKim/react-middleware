// import appConfig from "conf/default";
import { Interval, Lifecycle, Loading, Module, register } from 'core'

// import { CaptchaResponse, ConfigurationAJAXResponse, CurrentUserAJAXView, GameTypeView, LoginAJAXRequest, VerifyCaptchaAJAXResponse } from "type/api";
// import {LoginRequired, RefreshCaptchaIfError} from "util/decorator";
import Main from './component'
import { State } from './type'

// import {ModuleLoader} from "service/ModuleLoader";

const initialState: State = {}

class MainModule extends Module<State> {}

const module = register(new MainModule('main', initialState))
export const actions = module.getActions()
export const MainComponent = module.attachLifecycle(Main)
