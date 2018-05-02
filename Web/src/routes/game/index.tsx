import { h, Component } from 'preact';
let styles = require('./style.css');
import classNames from 'classnames'
import { connect } from 'redux-zero/preact';
import actions from './actions';
import isDoubleTap from '../../framework/DoubleTap';
import * as Guid from 'guid';

interface Props {
	taboo: string[]
}

interface State {
	toggleTips: boolean;
}

class Game extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			toggleTips: false,
		}
	}

	handleDoubleClick = (index: number) => (event) => {
		if (isDoubleTap(index)) {
			alert(index)
		}

	}

	renderTiles() {
		return (

			<table class="table is-bordered  is-fullwidth">
				{
					this.props.taboo.map((word, index) => {
						if (index % 2 == 0)
							return (
								<tr onClick={this.handleDoubleClick(index)}>

									<td>
										<span class="tag is-light is-rounded ">{0}</span>
										<span class="tag is-white ">{word}</span>
									</td>
									<td >
										<span class="tag is-light is-rounded">{1}</span>
										<span class="tag is-white">{this.props.taboo[index + 1]}</span>
									</td>
								</tr>
							)

					})
				}
			</table>
		)
	}

	handleAddWord = (event) => {
		console.log("df")
	}

	renderSelectTiles() {
		return (
			<div class="field has-addons">
				<p class="control is-expanded">
					<input class="input" type="text" placeholder="Enter a banned word" />
				</p>
				<p class="control">
					<a class="button" onClick={this.handleAddWord}>Ban</a>
				</p>
			</div>
		)
	}

	renderScore() {
		return (
			<div class="columns is-mobile">
				<div class="column is-half-mobile">
					<article class="message is-info">
						<div class="message-header">
							<p class="title is-1 has-text-centered is-white">10</p>
						</div>
					</article>
				</div>
				<div class="column is-half-mobile">
					<article class="message is-danger">
						<div class="message-header">
							<p class="title is-1 has-text-centered">{1}</p>
						</div>
					</article>
				</div>
			</div>
		)
	}

	renderTip() {
		return (
			<article class="message is-small is-warning">
				<div class="message-header">
					<p>Double tap a word to unban</p>
					<button class="delete is-small" onClick={() => this.setState({ toggleTips: true })}></button>
				</div>
			</article>
		)

	}

	renderTimer() {
		return (
			<p class="title is-1">
				- 60 -
			</p>
		)
	}

	render() {

		return (
			<section class="hero is-fullheight">
				<div class="hero-body">
					<div class="container has-text-centered">
						{this.renderTimer()}
						{this.renderScore()}
						{this.renderTiles()}
						{!this.state.toggleTips && this.renderTip()}
						{this.renderSelectTiles()}
					</div>
				</div>
			</section >

		);
	}
}

const mapToProps = ({ taboo }) => ({ taboo });
export default connect(mapToProps, actions)(Game)