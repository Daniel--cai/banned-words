
import { State } from '../../store'
import Api from '../../framework/Api'

export interface Action {
	createLobby: (name: string) => Promise<State>;
	joinLobby: (name: string, id: string) => Promise<State>;
}


const actions = store => ({
	createLobby: async (state: State, name: string) => {
		const body = { name }
		try {
			const response = await Api.post(`/lobby`, body)
			console.log(response.data)
			return { guid: response.data, name: name }
		} catch (error) {
			return ({ ...state, loading: false })
		}
	},
	joinLobby: async (state: State, name, id: string) => {

	}
});
export default actions;
