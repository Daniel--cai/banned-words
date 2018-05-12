
import { State, Player } from '../../store'
import Api from '../../framework/Api'
import GraphQLClient from '../../framework/Appsync'
import { GetPlayersEvent } from './events'

export interface Action {
	createLobby: (name: string) => Promise<State>
	getPlayers: (id: string) => Promise<State>
}


const actions = store => ({
	createLobby: async (state: State, name: string) => {

		const body = { name }
		try {
			const response = await Api.post(`/lobby`, body);
			console.log(response.data);
			return { guid: response.data, name: name };
		} catch (error) {
			return ({ ...state, loading: false })
		}
	},
	getPlayers: async (state: State, id: string) => {
		try {
			const response = await GraphQLClient.query(GetPlayersEvent, { id })
			const players = response.data.getPlayers
			console.log(players)
			return { players: players }
		} catch (error) {
			return { ...state, loading: false }
		}
	}
});
export default actions;
