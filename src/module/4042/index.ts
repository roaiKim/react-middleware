import { Module, register } from "core";
import Main from "./component";

class MainModule extends Module<{}> { }

const module = register(new MainModule("noFound", {}));
// export const actions = module.getActions();
export const MainComponent = module.attachLifecycle(Main);
