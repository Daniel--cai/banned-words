import { h, Component } from 'preact';
let styles = require('./style.css');
import classNames from 'classnames'
import { connect } from 'redux-zero/preact';
import actions from './actions';

import * as Guid from 'guid';

interface Props {
	taboo: string[]
}

class Game extends Component<Props, any> {
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


	handleClick = (index: number) => (event) => {
		alert(index);
	}

	render() {

		return (
			<section class="hero is-fullheight">
				<div class="hero-body">
					<div class="container has-text-centered">
						<div class={styles["items"]}>
							{
								this.props.taboo.map((word, index) => {
									return (
										<div class={styles["item"]} onClick={this.handleClick(index)}>{word}</div>
									)

								})
							}
						</div>
					</div>

				</div>
			</section >

		);
	}
}

const mapToProps = ({ taboo }) => ({ taboo });
export default connect(mapToProps, actions)(Game)