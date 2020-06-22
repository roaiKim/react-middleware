import {HomeHeroInfo} from "type/api";

export type TabType = "explore" | "plans" | "claims";

export interface RouteParam {
    type: TabType;
}

export interface State {
    type: TabType | undefined;
    homeExploreHero: HomeHeroInfo | null;
    homePlansHero: HomeHeroInfo | null;
    homeClaimsHero: HomeHeroInfo | null;
}
