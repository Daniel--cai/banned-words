import createStores from 'redux-zero'
export interface State {
    username: string;
    guid: string;
    loading: boolean;
}

const initialState: State = {
    username: '',
    guid: '',
    loading: false
};
const store = createStores(initialState)

export default store;