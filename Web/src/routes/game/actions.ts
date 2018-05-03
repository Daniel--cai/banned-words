import axios from 'axios'
const BASE_URL = "http://localhost:3000"
import { State } from '../../store'

export interface Action {
	addWord: (body: { name: string, team: string }) => Promise<State>
}

const actions = store => ({
	addWord: async (state, body): Promise<State> => {
		store.setState({ loading: true });
		console.log(state)

		console.log(body)
		try {
			//const response = await axios.post(`${BASE_URL}/users`, body)
			return { ...state, taboo: [...state.taboo, body.name] }
		}
		catch (error) {
			return ({ ...state, loading: false })
		}
	}
});
export default actions;
