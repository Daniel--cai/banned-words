import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from '../routes/Home';
import Game from '../routes/Game';
import Lobby from '../routes/Lobby'
import Submission from '../routes/Submission'

interface Props {}

interface State {}

export default class App extends Component<Props, State> {

	render() {
		return (
			<div id="app">
				<Router >
					<Home path="/" />
					<Game path="/game/" />
					<Lobby path="/lobby" />
					<Submission path="/submission" />
				</Router>
			</div>
		);
	}
}


