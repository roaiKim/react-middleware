import React from "react";
import {Switch, Link} from "react-router-dom";
import {Route, async} from "core";
import {ModuleLoader} from "service/ModuleLoader";

const Home = async(ModuleLoader.Home, "MainComponent");
const NoFound1 = async(ModuleLoader.noFound, "MainComponent");
const NoFound2 = async(ModuleLoader.noFound2, "MainComponent");

class MainLayout extends React.PureComponent {
    render() {
        return (
            <main>
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/:type(explore|plans|claims)?" component={Home} />
                    <Route path="/hearth/:type(explore|plans|claims)?" component={Home} />
                    <Route path="/hearth/detail" component={Home} />
                    <Route path="/hearth/insure" component={Home} />
                    <Route path="/hearth/order" component={Home} />
                    <Route path="/hearth/result/:type(success|blacklist|fail)?" component={Home} />
                    <Route path="/4042" component={NoFound2} />
                    <Route component={NoFound2} />
                </Switch>
            </main>
        );
    }
}

export default MainLayout;
