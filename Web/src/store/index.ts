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
    taboo: Array(16).fill("1223fgadjfhsff4")
};
const store = createStores(initialState)

export default store;