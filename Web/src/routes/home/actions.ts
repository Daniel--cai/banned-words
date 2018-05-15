
import { State } from '../../store'
import Api from '../../framework/Api'
import GraphQLClient from '../../framework/Appsync'
import { AddPlayerEvent } from './event'

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
		const body = { id, name }
		console.log("joinLobby")
		try {
			const response = await GraphQLClient.query(AddPlayerEvent, body)
			const players = response.data.addPlayer
			console.log(players)
			console.log(response)
			return { players: players, guid: id }
		} catch (error) {
			console.error(error)
			//no games found
		}
	}
});
export default actions;
