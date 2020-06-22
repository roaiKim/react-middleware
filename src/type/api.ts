export interface HomeHeroInfo {
    title: string;
    subtitle: string;
    description: string;
    img: string;
}

export interface HomeAPIResponse {
    code: number;
    message: string;
    data: HomeHeroInfo;
}
