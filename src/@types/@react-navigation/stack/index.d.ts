interface IFormAndViewCategory {
    key: string;
    title: string;
    type?: string;
}

declare namespace ReactNavigation {
    export interface RootParamList {
        Form: IFormAndViewCategory;
        ViewCategory: IFormAndViewCategory;
    }
}