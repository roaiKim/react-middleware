import React from "react";
import {connect} from "react-redux";
import {DocTitle, format} from "util/decorator";
import {RootState} from "type/state";
import {HomeHeroInfo} from "type/api";
import HeroCard from "../HeroCard";
import "./index.less";

interface Props {
    homePlansHero: HomeHeroInfo | null;
}

class Plans extends React.PureComponent<Props> {
    @DocTitle("影流之主")
    componentDidMount() {}

    @format
    hearthClick = () => {
        //
    };

    render() {
        const {homePlansHero} = this.props;
        return (
            <div className="home-explore-page">
                <div className="card-wrap">{homePlansHero && <HeroCard hero={homePlansHero} onClick={this.hearthClick} />}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        type: state.app.home.type,
        homePlansHero: state.app.home.homePlansHero,
    };
};

export default connect(mapStateToProps)(Plans);
