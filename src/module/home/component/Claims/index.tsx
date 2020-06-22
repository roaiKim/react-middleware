import React from "react";
import {connect} from "react-redux";
import {DocTitle, format} from "util/decorator";
import {RootState} from "type/state";
import {HomeHeroInfo} from "type/api";
import HeroCard from "../HeroCard";
import "./index.less";

interface Props {
    homeClaimsHero: HomeHeroInfo | null;
}

class Claims extends React.PureComponent<Props> {
    @DocTitle("影流之主")
    componentDidMount() {}

    @format
    hearthClick = () => {
        //
    };

    render() {
        const {homeClaimsHero} = this.props;
        return (
            <div className="home-explore-page">
                <div className="card-wrap">{homeClaimsHero && <HeroCard hero={homeClaimsHero} onClick={this.hearthClick} />}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        type: state.app.home.type,
        homeClaimsHero: state.app.home.homeClaimsHero,
    };
};

export default connect(mapStateToProps)(Claims);
