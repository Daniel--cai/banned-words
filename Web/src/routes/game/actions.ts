import axios from 'axios'
const BASE_URL = "http://localhost:3000"

const actions = store => ({
	setUsername: (state, body) => {
		store.setState({ loading: true });
		return axios.post(`${BASE_URL}/users`, body)
			.then(response => {
				console.log(response.data.id)
				return { username:body.name , loading: false, guid:response.data.id }
			})
			.catch(error => ({ loading: false }));
	}
});
export default actions;
