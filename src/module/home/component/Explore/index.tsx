import React from "react";
import HeroCard from "../HeroCard";
import {DocTitle, format} from "util/decorator";
import {connect} from "react-redux";
import {RootState} from "type/state";
import {HomeHeroInfo} from "type/api";
import "./index.less";

interface Props {
    homeExploreHero: HomeHeroInfo | null;
}

class Explore extends React.PureComponent<Props> {
    @DocTitle("疾风剑豪")
    componentDidMount() {}

    @format
    hearthClick = () => {
        //
    };

    render() {
        const {homeExploreHero} = this.props;
        return (
            <div className="home-explore-page">
                <div className="card-wrap">{homeExploreHero && <HeroCard hero={homeExploreHero} onClick={this.hearthClick} />}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        type: state.app.home.type,
        homeExploreHero: state.app.home.homeExploreHero,
    };
};

export default connect(mapStateToProps)(Explore);
