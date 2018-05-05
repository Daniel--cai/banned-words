import createStores from 'redux-zero'
export interface State {
    name: string;
    guid: string;
    loading: boolean;
    taboos: string[]
    keywords: string[]
}

const initialState: State = {
    name: '',
    guid: '',
    loading: false,
    taboos: ["star", "saastar", "stfsfsfar", "sfsfsfsfsfs", "star", "star", "stasr", "star", "stsssar", "star", "stasdfr", "ss", "star", "star", "stfsfasfar", "sstar"],
    keywords: ["apple", "turtle", "ship", "table", "monkey"],
};
const store = createStores(initialState)

export default store;