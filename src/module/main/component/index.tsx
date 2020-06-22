import React from "react";
import {showLoading} from "core";
import {connect} from "react-redux";
import {RootState} from "type/state";
import LoadingComponent from "./LoadingComponent";
import MainLayout from "./Main";
import "./index.less";

interface Props {
    showGlobalLoading: boolean;
}

class Component extends React.PureComponent<Props> {
    render() {
        const {showGlobalLoading} = this.props;
        return (
            <React.Fragment>
                {showGlobalLoading && <LoadingComponent />}
                <MainLayout />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState): Props => {
    return {
        showGlobalLoading: showLoading(state),
    };
};

export default connect(mapStateToProps)(Component);
