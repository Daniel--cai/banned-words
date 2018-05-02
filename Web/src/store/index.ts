import createStores from 'redux-zero'
export interface State {
    username: string;
    guid: string;
    loading: boolean;
    taboo: string[]
}

const initialState: State = {
    username: '',
    guid: '',
    loading: false,
    taboo: ["star","saastar","stfsfsfar","sfsfsfsfsfs","star","star","stasr","star","stsssar","star","stasdfr","ss","star","star","stfsfasfar","sstar"]
};
const store = createStores(initialState)

export default store;