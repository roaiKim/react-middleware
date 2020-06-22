// Keep webpackChunkName short, for sake of shorter bundled JS name
// Every method returns: Promise<ModuleExportedData>

export class ModuleLoader {
    static noFound() {
        return import(/* webpackChunkName: "noFound" */ "module/404");
    }
    static Home() {
        return import(/* webpackChunkName: "home" */ "module/home");
    }
    static noFound2() {
        return import(/* webpackChunkName: "noFound2" */ "module/4042");
    }
}
