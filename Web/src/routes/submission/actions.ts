import axios from 'axios'
const BASE_URL = "http://localhost:3000"
import { State } from '../../store'

export interface Action {
	addWord: (name: string, team: string) => Promise<State>
	removeWord: (word: string) => Promise<State>
}

const actions = store => ({
	addWord: async (state: State, name: string, team: string) => {

		store.setState({ loading: true });
		store.setState({ taboo: [...state.taboos, name] })
		console.log(state)

		console.log(name)
		try {
			//const response = await axios.post(`${BASE_URL}/users`, body)
			return { taboos: [...state.taboos, name] }
		}
		catch (error) {
			return ({ ...state, loading: false })
		}
	},

	removeWord: async (state: State, word: string) => {
		store.setState({ loading: true });
		store.setState({ taboos: state.taboos.filter(taboo => taboo != word) })
		console.log(name)
		try {
			//const response = await axios.post(`${BASE_URL}/users`, body)
			return { taboo: [...state.taboos, name] }
		}
		catch (error) {
			return ({ ...state, loading: false })
		}
	},
});
export default actions;
