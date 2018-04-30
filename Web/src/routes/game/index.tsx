import { h, Component } from 'preact';
//import style from './style.css';
import classNames from 'classnames'
import { connect } from 'redux-zero/preact';
import actions from './actions';

import * as Guid from 'guid';
//const getClientId = () => 'web-client:' + Guid.raw();
const getMessageId = () => 'message-id:' + Guid.raw();

/*
Move {
	Game ID
	Piece ID
	ParticipantID 
	Move Type  -> Name
	Move Order
	Move Notation
	From Position
	To Position
	Rotation
}
*/

class Game extends Component<any,any> {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			message: [],
			isConnected: false,
			selected: null,
			moves: []
		}
	}


	render() {
		return (
			<section class="hero is-fullheight">
			
			</section >

		);
	}
}

const mapToProps = ({ username, loading, guid }) => ({ username, loading, guid });
export default connect(mapToProps, actions)(Game)